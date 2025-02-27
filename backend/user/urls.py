from django.urls import path, include

from .views.login_view import LoginView
from .views.logout_view import LogoutView
from .views.me import UserMeView, UserView
from .views.user_profile import UserMeProfileView

session_based_login_patterns = [
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]

user_patterns = [
    path('me/', UserMeView.as_view({'get': 'get_for_current_logged_in_user'}), name='user_me'),
    path('me/profile/', UserMeProfileView.as_view({'get': 'get_for_logged_in_user'}), name='user_me_profile'),
    path('', UserView.as_view({'get': 'get_user_detail'}), name='user-detail'),
]

urlpatterns = [
    path('auth/', include(session_based_login_patterns)),
    path('user/', include(user_patterns)),
]
