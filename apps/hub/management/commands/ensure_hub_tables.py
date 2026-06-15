from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = "Ensure hub tables exist by resetting and reapplying migrations"

    def handle(self, *args, **options):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema='public' AND table_name='hub_hero_video'"
            )
            if cursor.fetchone():
                self.stdout.write("hub tables already exist")
                return
            cursor.execute(
                "SELECT app, name FROM django_migrations WHERE app='hub'"
            )
            rows = cursor.fetchall()
            if rows:
                cursor.execute("DELETE FROM django_migrations WHERE app='hub'")
                self.stdout.write(f"removed {len(rows)} stale hub migration records")
        from django.core.management import call_command
        call_command("migrate", "hub", fake_initial=True)
        self.stdout.write("hub migrations applied")
