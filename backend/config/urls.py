from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


def health_check(request):
    return JsonResponse({"status": "ok"})


def api_root(request):
    return JsonResponse({
        "status": "ok",
        "version": "1.0",
        "endpoints": {
            "health": "/api/health/",
            "hub": "/api/hub/",
            "users": "/api/users/",
            "auth": "/api/auth/",
            "docs": "/api/docs/",
        }
    })

core_patterns = [
    path("core/", include("apps.core.urls")),
    path("startups/", include("apps.startups.urls")),
    path("investors/", include("apps.investors.urls")),
    path("partners/", include("apps.partners.urls")),
    path("news/", include("apps.news.urls")),
    path("careers/", include("apps.careers.urls")),
    path("media/", include("apps.media.urls")),
    path("seo/", include("apps.seo.urls")),
    path("contact/", include("apps.contact.urls")),
    path("meetings/", include("apps.meetings.urls")),
    path("newsletter/", include("apps.newsletter.urls")),
    path("logs/", include("apps.logs.urls")),
    path("users/", include("apps.users.urls")),
    path("education/", include("apps.education.urls")),
    path("events/", include("apps.events.urls")),
    path("coworking/", include("apps.coworking.urls")),
    path("students/", include("apps.students.urls")),
    path("hub/", include("apps.hub.urls")),
]

auth_patterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]

urlpatterns = [
    path("api/health/", health_check, name="health-check"),
    path("api/", api_root, name="api-root"),
    path("admin/", admin.site.urls),
    path("api/", include(core_patterns)),
    path("api/auth/", include(auth_patterns)),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
