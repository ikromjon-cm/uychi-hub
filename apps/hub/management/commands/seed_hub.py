from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.hub.models import News, Announcement, Startup, Job, HeroVideo
from apps.news.models import Article
from apps.core.models import HomepageStartup
from apps.careers.models import JobPosting

JOB_TYPE_MAP = {
    "Full-time": "fulltime",
    "Part-time": "parttime",
    "Contract": "contract",
    "Internship": "parttime",
}


class Command(BaseCommand):
    help = "Populate hub tables (News, Announcement, Startup, Job, HeroVideo) from legacy app data."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Clear existing hub rows before seeding.",
        )

    def handle(self, *args, **options):
        force = options["force"]

        if force:
            for M in (News, Announcement, Startup, Job, HeroVideo):
                M.objects.all().delete()

        # --- News (from published Articles) ---
        if News.objects.count() == 0:
            for a in Article.objects.filter(status="published"):
                News.objects.create(
                    title_en=a.title,
                    title_uz=a.title,
                    title_ru=a.title,
                    body_en=a.content,
                    body_uz=a.content,
                    body_ru=a.content,
                    status="approved",
                )
            self.stdout.write(f"News: {News.objects.count()}")

        # --- Startups (from HomepageStartup) ---
        if Startup.objects.count() == 0:
            for s in HomepageStartup.objects.all():
                Startup.objects.create(
                    title=s.tagline,
                    sector=s.sector,
                    problem_en=s.problem,
                    problem_uz=s.problem,
                    problem_ru=s.problem,
                    solution_en=s.solution,
                    solution_uz=s.solution,
                    solution_ru=s.solution,
                    tech_stack=s.tech_stack,
                    status="approved",
                )
            self.stdout.write(f"Startup: {Startup.objects.count()}")

        # --- Jobs (from active JobPostings) ---
        if Job.objects.count() == 0:
            qs = JobPosting.objects.filter(status="active") or JobPosting.objects.all()
            for j in qs:
                Job.objects.create(
                    title_en=j.title,
                    title_uz=j.title,
                    title_ru=j.title,
                    department=j.department,
                    type=JOB_TYPE_MAP.get(j.employment_type, "fulltime"),
                    salary=j.salary_range,
                    status="approved",
                )
            self.stdout.write(f"Job: {Job.objects.count()}")

        # --- Announcements (derived from latest news) ---
        if Announcement.objects.count() == 0:
            for a in Article.objects.filter(status="published")[:4]:
                Announcement.objects.create(
                    title_en=a.title,
                    title_uz=a.title,
                    title_ru=a.title,
                    body_en=a.excerpt or a.content[:280],
                    body_uz=a.excerpt or a.content[:280],
                    body_ru=a.excerpt or a.content[:280],
                    date=(a.published_at or a.created_at or timezone.now()).date(),
                    status="approved",
                )
            self.stdout.write(f"Announcement: {Announcement.objects.count()}")

        # Hero video is intentionally not seeded — admins upload a real
        # video via /admin/hub/hero-video; the homepage shows a graceful
        # fallback when none exists.

        self.stdout.write(self.style.SUCCESS("hub seed complete"))
