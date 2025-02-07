from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views.me import UserMeView, UserView
from .views.token_blacklist import TokenBlacklistView
from .views.token_refresh_view import CustomTokenRefreshView
from .views.user_profile import UserMeProfileView

auth_patterns = [
    path('token/', TokenObtainPairView.as_view(), name='auth_jwt_token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='auth_jwt_token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='auth_jwt_token_blacklist')
]

user_patterns = [
    path('me/', UserMeView.as_view({'get': 'get_for_current_logged_in_user'}), name='user_me'),
    path('me/profile/', UserMeProfileView.as_view({'get': 'get_for_logged_in_user'}), name='user_me_profile'),
    re_path('(?P<pk>\d+)/', UserView.as_view({'get': 'retrieve'}), name='user-detail'),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
    path('user/', include(user_patterns)),
]
