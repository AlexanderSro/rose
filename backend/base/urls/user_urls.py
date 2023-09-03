from django.urls import path
from base.views.user_views import (
    MyTokenObtainPairView,
    registerUser,
    updateUserProfile,
    getUserProfile,
    getUsers,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", registerUser, name="register"),
    path("profile/", getUserProfile, name="user-profile"),
    path("profile/update/", updateUserProfile, name="user-profile-update"),
    path("", getUsers, name="users"),
]
