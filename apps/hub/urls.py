from django.urls import path
from . import views

urlpatterns = [
    path("stats/", views.StatViewSet.as_view({"get": "list"}), name="stats-list"),
    path("stats/<int:pk>/", views.StatViewSet.as_view({"get": "retrieve"}), name="stats-detail"),
    path("hubs/", views.HubViewSet.as_view({"get": "list"}), name="hubs-list"),
    path("hubs/<int:pk>/", views.HubViewSet.as_view({"get": "retrieve"}), name="hubs-detail"),
    path("startups/", views.StartupViewSet.as_view({"get": "list"}), name="startups-list"),
    path("startups/<int:pk>/", views.StartupViewSet.as_view({"get": "retrieve"}), name="startups-detail"),
    path("partners/", views.PartnerViewSet.as_view({"get": "list"}), name="partners-list"),
    path("partners/<int:pk>/", views.PartnerViewSet.as_view({"get": "retrieve"}), name="partners-detail"),
    path("leads/", views.LeadCreateView.as_view(), name="leads-create"),
    path("admin/stats/", views.AdminStatViewSet.as_view({"get": "list", "post": "create"}), name="admin-stats-list"),
    path("admin/stats/<int:pk>/", views.AdminStatViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="admin-stats-detail"),
    path("admin/hubs/", views.AdminHubViewSet.as_view({"get": "list", "post": "create"}), name="admin-hubs-list"),
    path("admin/hubs/<int:pk>/", views.AdminHubViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="admin-hubs-detail"),
    path("admin/startups/", views.AdminStartupViewSet.as_view({"get": "list", "post": "create"}), name="admin-startups-list"),
    path("admin/startups/<int:pk>/", views.AdminStartupViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="admin-startups-detail"),
    path("admin/partners/", views.AdminPartnerViewSet.as_view({"get": "list", "post": "create"}), name="admin-partners-list"),
    path("admin/partners/<int:pk>/", views.AdminPartnerViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}), name="admin-partners-detail"),
    path("admin/leads/", views.AdminLeadViewSet.as_view({"get": "list"}), name="admin-leads-list"),
    path("admin/leads/<int:pk>/", views.AdminLeadViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name="admin-leads-detail"),
]
