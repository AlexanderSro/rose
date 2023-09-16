from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer
import datetime
import stripe

import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.views import View



from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from base.models import Order
from base.serializers import OrderSerializer

from django.conf import settings

# Logger setup for debugging and tracking
import logging

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY



class MyOrdersList(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createOrder(request):
    user = request.user
    data = request.data

    # Validate incoming data
    if "orderItems" in data and data["orderItems"]:
        # Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # Create Order Items
        for item in data["orderItems"]:
            product = Product.objects.get(id=item["product"])

            # Update Stock
            product.countInStock -= item["qty"]
            product.save()

            orderItem = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item["qty"],
                price=item["price"],
                image=product.image.url,
            )

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(
            {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    except ObjectDoesNotExist:
        return Response(
            {"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = get_object_or_404(Order, _id=pk)

    if order.user == request.user:
        order.isPaid = True
        order.paidAt = datetime.datetime.now()
        order.save()
        return Response("Order was paid")
    else:
        return Response(
            {"detail": "Not authorized to update this order"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = get_object_or_404(Order, _id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.datetime.now()
    order.save()
    return Response("Order was marked as delivered")


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteOrder(request, pk):
    order = get_object_or_404(Order, _id=pk)
    order.delete()
    return Response("Order was deleted")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createPaymentIntent(request):
    user = request.user
    data = request.data

    try:
        order = Order.objects.get(user=user, _id=data["orderId"])

        # Create a PaymentIntent with the order amount and currency
        payment_intent = stripe.PaymentIntent.create(
            amount=int(order.totalPrice * 100),  # amount is in cents
            currency="ron",
        )

        return Response(
            {"clientSecret": payment_intent["client_secret"]},
            status=status.HTTP_201_CREATED,
        )

    except Order.DoesNotExist:
        return Response(
            {"error": "Order does not exist."}, status=status.HTTP_404_NOT_FOUND
        )
    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhookView(View):
    def post(self, request, *args, **kwargs):
        payload = request.body
        signature = request.META["HTTP_STRIPE_SIGNATURE"]
        event = None

        try:
            event = stripe.Webhook.construct_event(payload, signature, stripe.api_key)
        except ValueError as e:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            return HttpResponse(status=400)

        # Handle the event
        if event["type"] == "payment_intent.succeeded":
            payment_intent = event["data"]["object"]
            order_id = payment_intent["metadata"]["order_id"]

            # Here, you can update your Order model
            order = Order.objects.get(id=order_id)
            order.status = Order.PAID  # Or any other status
            order.save()

        return HttpResponse(status=200)
