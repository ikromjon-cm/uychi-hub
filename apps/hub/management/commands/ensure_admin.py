import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create the admin superuser if it does not exist (no content seeding)."

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.environ.get("ADMIN_USERNAME", "admin")
        email = os.environ.get("ADMIN_EMAIL", "admin@uychi.uz")
        password = os.environ.get("ADMIN_PASSWORD", "admin123")
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(f"Created admin user '{username}'"))
        else:
            self.stdout.write(f"Admin user '{username}' already exists")
