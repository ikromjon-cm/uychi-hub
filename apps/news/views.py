from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
from django.utils import timezone


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["category", "status"]
    search_fields = ["title", "content", "excerpt", "author_name"]
    ordering_fields = ["published_at", "created_at", "views"]

    def get_queryset(self):
        qs = Article.objects.all() if self.request.user.is_staff else Article.objects.filter(status="published")
        slug = self.request.query_params.get("slug")
        if slug:
            qs = qs.filter(slug=slug)
        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Article.objects.filter(pk=instance.pk).update(views=instance.views + 1)
        instance.views += 1
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        instance = serializer.instance
        new_status = serializer.validated_data.get("status", instance.status)
        if new_status == "published" and instance.status != "published" and not instance.published_at:
            serializer.save(published_at=timezone.now())
        else:
            serializer.save()

    def perform_create(self, serializer):
        status = serializer.validated_data.get("status", "draft")
        if status == "published":
            serializer.save(published_at=timezone.now())
        else:
            serializer.save()
