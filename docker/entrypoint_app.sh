#!/bin/sh
python /src/manage.py migrate --noinput
#python /src/manage.py compilemessages

echo "####### Starting uWSGI server"
uwsgi --http :8000 --module app.wsgi --threads 2 --processes 8 --http-timeout 1200
