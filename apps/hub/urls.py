from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"stats", views.StatViewSet, basename="stat")
router.register(r"partners", views.PartnerViewSet, basename="partner")
router.register(r"hero-video", views.HeroVideoViewSet, basename="hero-video")
router.register(r"news", views.NewsViewSet, basename="news")
router.register(r"announcements", views.AnnouncementViewSet, basename="announcement")
router.register(r"startups", views.StartupViewSet, basename="startup")
router.register(r"jobs", views.JobViewSet, basename="job")

admin_router = DefaultRouter()
admin_router.register(r"stats", views.AdminStatViewSet, basename="admin-stat")
admin_router.register(r"partners", views.AdminPartnerViewSet, basename="admin-partner")
admin_router.register(r"hero-video", views.AdminHeroVideoViewSet, basename="admin-hero-video")
admin_router.register(r"news", views.AdminNewsViewSet, basename="admin-news")
admin_router.register(r"announcements", views.AdminAnnouncementViewSet, basename="admin-announcement")
admin_router.register(r"startups", views.AdminStartupViewSet, basename="admin-startup")
admin_router.register(r"jobs", views.AdminJobViewSet, basename="admin-job")
admin_router.register(r"leads", views.AdminLeadViewSet, basename="admin-lead")

urlpatterns = [
    # Specific creation routes must come before the router so that
    # "startups/apply/" / "jobs/apply/" are not captured by the router's
    # detail route (pk="apply") on the read-only viewsets.
    path("leads/", views.LeadCreateView.as_view(), name="lead-create"),
    path("startups/apply/", views.StartupCreateView.as_view(), name="startup-apply"),
    path("jobs/apply/", views.JobCreateView.as_view(), name="job-apply"),
    path("admin/", include(admin_router.urls)),
    path("", include(router.urls)),
]
