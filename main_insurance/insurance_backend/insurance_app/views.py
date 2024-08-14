from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import CustomUser, ClaimRequest, Policy, SupportRequest
from .serializers import PolicySerializer, UserSerializer, ClaimRequestSerializer, SupportRequestSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import  AllowAny

class SignupView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'username': user.username}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # #Admin

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # #Admin




# Claims
class ClaimRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = ClaimRequestSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        username = self.request.query_params.get('username')
        if username:
            return ClaimRequest.objects.filter(username=username)
        return ClaimRequest.objects.all()

    def perform_create(self, serializer):
        username = self.request.data.get('username')
        policy_number = self.request.data.get('policy_number')
        policy_type = self.request.data.get('policy_type')
        claim_amount = self.request.data.get('claim_amount')

        try:
            CustomUser.objects.get(username=username)
            serializer.save(username=username, policy_number=policy_number, policy_type=policy_type, claim_amount=claim_amount)
        except CustomUser.DoesNotExist:
            raise ValidationError('User does not exist.')

class ClaimRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClaimRequest.objects.all()
    serializer_class = ClaimRequestSerializer
    permission_classes = [AllowAny]





# Support Form
class SupportRequestCreateView(generics.CreateAPIView):
    serializer_class = SupportRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('Request data:', request.data)
            print('Errors:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SupportRequestListView(generics.ListAPIView):
    queryset = SupportRequest.objects.all()
    serializer_class = SupportRequestSerializer
    permission_classes = [AllowAny]  # #Admin
    

class SupportRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SupportRequest.objects.all()
    serializer_class = SupportRequestSerializer
    permission_classes = [AllowAny]





# Policy Views
class PolicyListCreateView(generics.ListCreateAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer
    permission_classes = [AllowAny]  # #Admin

class PolicyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer
    permission_classes = [AllowAny]  # #Admin




class SurrenderPolicyView(APIView):
    def post(self, request, pk):
        try:
            policy = Policy.objects.get(pk=pk)
            policy.status = 'Surrendered'
            policy.save()
            return Response({'status': 'Policy surrendered successfully'}, status=status.HTTP_200_OK)
        except Policy.DoesNotExist:
            return Response({'error': 'Policy not found'}, status=status.HTTP_404_NOT_FOUND)
