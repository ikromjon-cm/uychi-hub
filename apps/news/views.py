from rest_framework import viewsets, permissions
from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["category", "status"]
    search_fields = ["title", "content", "excerpt", "author_name"]
    ordering_fields = ["published_at", "created_at", "views"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Article.objects.all()
        return Article.objects.filter(status="published")
