#!/bin/bash
python manage.py ensure_hub_tables
python manage.py migrate --run-syncdb
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
