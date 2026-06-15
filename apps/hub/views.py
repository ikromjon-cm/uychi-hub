from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import Stat, Hub, Startup, Partner, Lead
from .serializers import StatSerializer, HubSerializer, StartupSerializer, PartnerSerializer, LeadSerializer


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [permissions.AllowAny]


class HubViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hub.objects.all()
    serializer_class = HubSerializer
    permission_classes = [permissions.AllowAny]


class StartupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer
    permission_classes = [permissions.AllowAny]


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.AllowAny]


class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        name = request.data.get("name", "").strip()
        email = request.data.get("email", "").strip()
        message = request.data.get("message", "").strip()
        if not name or not email or not message:
            return Response({"detail": "Ism, email va xabar majburiy."}, status=status.HTTP_400_BAD_REQUEST)
        if len(name) < 2 or len(message) < 10:
            return Response({"detail": "Ism kamida 2 ta, xabar kamida 10 ta belgi bo'lishi kerak."}, status=status.HTTP_400_BAD_REQUEST)
        lead_type = request.data.get("lead_type", "contact")
        allowed_types = dict(Lead.TYPE_CHOICES).keys()
        if lead_type not in allowed_types:
            return Response({"detail": "Noto'g'ri lead turi."}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class AdminStatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminHubViewSet(viewsets.ModelViewSet):
    queryset = Hub.objects.all()
    serializer_class = HubSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminStartupViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminPartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminLeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "delete"]
