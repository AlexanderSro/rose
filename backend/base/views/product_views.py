from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product, OrderItem
from base.serializers import ProductSerializer
from django.core.exceptions import ObjectDoesNotExist  # Add this import for handling ObjectDoesNotExist exception

from django.shortcuts import get_list_or_404
from django.db.models import Q
from random import sample
import logging

@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getRecommendedProducts(request):
    import random
    import logging  # Add this import for logging

    logging.basicConfig(level=logging.DEBUG)  # Set the logging level to DEBUG

    # Assuming the user is authenticated and their ID is stored in request.user.id
    user_id = request.user.id

    try:
        # Fetch product IDs that are already in the cart for this user
        cart_product_ids = OrderItem.objects.filter(
            order__user_id=user_id,
            order__isPaid=False
        ).values_list('product_id', flat=True)

        logging.debug(f'Products in cart: {cart_product_ids}')  # Log products in cart

        # Fetch all product IDs
        all_product_ids = Product.objects.values_list('_id', flat=True)
        
        # Exclude product IDs that are already in the cart
        available_product_ids = [id for id in all_product_ids if id not in cart_product_ids]
        
        logging.debug(f'Available products for recommendation: {available_product_ids}')  # Log available products

        # Select random products
        random_product_ids = random.sample(available_product_ids, min(5, len(available_product_ids)))  # Recommending up to 5 random products

        logging.debug(f'Recommended products: {random_product_ids}')  # Log recommended products

        # Fetch the actual Product instances
        recommended_products = Product.objects.filter(_id__in=random_product_ids)
        
        serializer = ProductSerializer(recommended_products, many=True)
        return Response(serializer.data)

    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logging.error(f'An error occurred: {e}')  # Log any other exceptions
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)