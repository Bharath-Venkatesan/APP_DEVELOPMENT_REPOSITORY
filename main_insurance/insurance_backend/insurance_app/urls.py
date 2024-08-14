from django.urls import path
from .views import (
    PolicyDetailView, PolicyListCreateView, SignupView, LoginView,
    SupportRequestCreateView, SupportRequestDetailView, SurrenderPolicyView,
    UserListCreateView, UserDetailView, ClaimRequestListCreateView,
    ClaimRequestDetailView, SupportRequestListView
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('claimsreq/', ClaimRequestListCreateView.as_view(), name='claim-list-create'),
    path('claimsreq/<int:pk>/', ClaimRequestDetailView.as_view(), name='claim-detail'),
    path('support/', SupportRequestCreateView.as_view(), name='support-create'),
    path('support/<int:pk>/', SupportRequestDetailView.as_view(), name='support-detail'), 
    path('mypolicies/', PolicyListCreateView.as_view(), name='policy-list-create'),
    path('policies/<int:pk>/', PolicyDetailView.as_view(), name='policy-detail'),
    path('policies/<int:pk>/surrender/', SurrenderPolicyView.as_view(), name='surrender-policy'),

    # Admin URLs
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('support-requests/', SupportRequestListView.as_view(), name='support-request-list'),
]
