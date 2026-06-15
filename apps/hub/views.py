from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import HeroVideo, News, Announcement, Startup, Job, Lead, Stat, Partner, SiteSettings
from .serializers import (
    HeroVideoSerializer, NewsSerializer, AnnouncementSerializer,
    StartupSerializer, JobSerializer, LeadSerializer,
    StatSerializer, PartnerSerializer, SiteSettingsSerializer,
    AdminNewsSerializer, AdminAnnouncementSerializer,
    AdminStartupSerializer, AdminJobSerializer,
)


class SiteSettingsView(APIView):
    """GET (public) and PATCH/PUT (admin) the single site-settings row."""
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        return Response(SiteSettingsSerializer(obj).data)

    def patch(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        ser = SiteSettingsSerializer(obj, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)

    def put(self, request):
        return self.patch(request)


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [permissions.AllowAny]


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.AllowAny]


class HeroVideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroVideo.objects.filter(is_active=True)
    serializer_class = HeroVideoSerializer
    permission_classes = [permissions.AllowAny]


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.filter(status="approved")
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]


class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Announcement.objects.filter(status="approved")
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.AllowAny]


class StartupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Startup.objects.filter(status="approved")
    serializer_class = StartupSerializer
    permission_classes = [permissions.AllowAny]


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Job.objects.filter(status="approved")
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]


class StartupCreateView(generics.CreateAPIView):
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer
    permission_classes = [permissions.AllowAny]


class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


class AutoApproveMixin:
    """Content created or edited through the admin panel is trusted, so it is
    published (status='approved') immediately instead of waiting for review.
    This is what makes admin additions appear on the public site at once."""

    def perform_create(self, serializer):
        serializer.save(status="approved")


class AdminStatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminPartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminHeroVideoViewSet(viewsets.ModelViewSet):
    queryset = HeroVideo.objects.all()
    serializer_class = HeroVideoSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AdminNewsViewSet(AutoApproveMixin, viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = AdminNewsSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminAnnouncementViewSet(AutoApproveMixin, viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AdminAnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminStartupViewSet(AutoApproveMixin, viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = AdminStartupSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminJobViewSet(AutoApproveMixin, viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = AdminJobSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminLeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "delete"]
