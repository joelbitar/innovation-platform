from django.urls import path, include, re_path

from .views.login_view import LoginView
from .views.logout_view import LogoutView
from .views.user_me_view import UserMeView, UserView
from .views.user_me_profile_view import UserMeProfileView

session_based_login_patterns = [
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]

user_patterns = [
    path('me/', UserMeView.as_view({'get': 'get_for_current_logged_in_user'}), name='user_me'),
    path('me/profile/', UserMeProfileView.as_view({'get': 'get_for_logged_in_user', 'patch': 'patch_for_logged_in_user'}), name='user_me_profile'),
    re_path(r'(?P<user_id>\d+)/', UserView.as_view({'get': 'get_user_detail'}), name='user-detail'),
]

urlpatterns = [
    path('user/', include(user_patterns)),
    path("_allauth/", include("allauth.headless.urls"))
]
