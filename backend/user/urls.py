from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView
from .views.me import UserMeView
from .views.token_blacklist import TokenBlacklistView
from .views.token_refresh_view import CustomTokenRefreshView
from .views.user_profile import UserMeProfileView

auth_patterns = [
    path('token/', TokenObtainPairView.as_view(), name='auth_jwt_token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='auth_jwt_token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='auth_jwt_token_blacklist')
]

user_patterns = [
    path('me/', UserMeView.as_view(), name='api_user_me'),
    path('me/profile/', UserMeProfileView.as_view({'get': 'get', 'put': 'put'}), name='user-me-profile'),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
    path('user/', include(user_patterns)),
]
