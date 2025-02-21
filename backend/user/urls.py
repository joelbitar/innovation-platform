from django.urls import path, include, re_path

from .views.me import UserMeView, UserView
from .views.token_blacklist import CustomTokenBlacklistView
from .views.token_obtain_view import CustomTokenObtainPairView
from .views.token_refresh_view import CustomTokenRefreshView
from .views.user_profile import UserMeProfileView

auth_patterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='auth_jwt_token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='auth_jwt_token_refresh'),
    path('token/blacklist/', CustomTokenBlacklistView.as_view(), name='auth_jwt_token_blacklist')
]

user_patterns = [
    path('session/', UserView.as_view({'get': 'get_session_user_detail'}), name='session-user-detail'),
    path('me/', UserMeView.as_view({'get': 'get_for_current_logged_in_user'}), name='user_me'),
    path('me/profile/', UserMeProfileView.as_view({'get': 'get_for_logged_in_user'}), name='user_me_profile'),
    path('', UserView.as_view({'get': 'get_user_detail'}), name='user-detail'),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
    path('user/', include(user_patterns)),
]
