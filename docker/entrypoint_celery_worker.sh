#!/bin/sh
python /src/manage.py migrate --noinput
#python /src/manage.py compilemessages

echo "####### Starting worker"
celery -A app worker -B -l INFO
