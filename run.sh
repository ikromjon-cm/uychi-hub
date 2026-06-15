#!/bin/bash
set -e
python manage.py ensure_hub_tables
python manage.py migrate --run-syncdb
# Seed legacy app data + admin user (idempotent), then populate the hub
# tables from it (idempotent). Safe to run on every deploy.
python manage.py seed_data || true
python manage.py seed_hub || true
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
