from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import api_view, permission_classes as perm_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer
from apps.utils.email import register_welcome


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ["username", "email", "first_name", "last_name"]
    ordering_fields = ["date_joined", "username"]


@api_view(["GET"])
@perm_classes([permissions.IsAuthenticated])
def me_view(request):
    return Response(UserSerializer(request.user).data)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        try:
            register_welcome(user)
        except Exception:
            pass
        return Response(
            {"detail": "Ro'yxatdan o'tish muvaffaqiyatli! Elektron pochtangizni tekshiring."},
            status=status.HTTP_201_CREATED,
        )
