from rest_framework import viewsets, permissions, generics
from .models import HeroVideo, News, Announcement, Startup, Job, Lead, Stat, Partner
from .serializers import (
    HeroVideoSerializer, NewsSerializer, AnnouncementSerializer,
    StartupSerializer, JobSerializer, LeadSerializer,
    StatSerializer, PartnerSerializer,
    AdminNewsSerializer, AdminAnnouncementSerializer,
    AdminStartupSerializer, AdminJobSerializer,
)


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


class AdminNewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = AdminNewsSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminAnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AdminAnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminStartupViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = AdminStartupSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminJobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = AdminJobSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminLeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "delete"]
