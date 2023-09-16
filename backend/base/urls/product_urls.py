from django.urls import path
from base.views.product_views import getProducts, getProduct, getRecommendedProducts

urlpatterns = [
    path("recommended", getRecommendedProducts, name="recommended-products"),
    path("", getProducts, name="products"),
    path("<str:pk>", getProduct, name="product"),
]
