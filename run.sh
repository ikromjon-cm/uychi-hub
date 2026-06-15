#!/bin/bash
# Startup must never be killed by a migration hiccup — gunicorn always starts.
set +e

python manage.py ensure_hub_tables

# Normal path. If it fails because the hub schema was created outside of
# migrations (status column already present but 0002 unrecorded), reconcile by
# faking the conflicting migration, then re-run so later migrations (e.g. the
# site-settings table) still get applied.
python manage.py migrate --run-syncdb --noinput
if [ $? -ne 0 ]; then
  echo ">> migrate failed — reconciling hub migration state"
  python manage.py migrate hub 0002 --fake --noinput
  python manage.py migrate --run-syncdb --noinput
fi

# Only ensure the admin user exists — no demo content is seeded.
python manage.py ensure_admin
python manage.py collectstatic --noinput

gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
