#!/bin/bash
set -e
python manage.py ensure_hub_tables
python manage.py migrate --run-syncdb
# Only ensure the admin user exists — no demo content is seeded, the admin
# adds all real content through the panel.
python manage.py ensure_admin || true
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
