FROM python:3.13-slim as app_python

RUN apt-get update && apt-get -y install \
	gcc \
	gettext

WORKDIR /src

# Install python packages \
COPY backend/requirements.txt /src/requirements.txt
RUN python -m venv /py && \
	/py/bin/pip install --upgrade pip && \
	/py/bin/pip install -r /src/requirements.txt


# #############################################################################
# #############                   Base image                     ##############
# #############################################################################

FROM app_python as app_base

WORKDIR /src

# Copy the source code
COPY backend /src

# Copy in the python packages
COPY --from=app_python /py /py

# Set python path
ENV PATH="/py/bin:$PATH"


# #############################################################################
# ############                   App image                          ###########
# #############################################################################
FROM app_base as app_prod

#COPY ./backend/uwsgi_params /
COPY ./entrypoint_app.sh /
RUN ["chmod", "+x", "/entrypoint_app.sh"]
RUN ["chown", "django-user:django-user", "/entrypoint_app.sh"]

WORKDIR /src/

ENTRYPOINT ["/entrypoint_app.sh"]

# #############################################################################
# ############                Celery worker image                   ###########
# #############################################################################
FROM app_base as celery_worker


COPY docker/entrypoint_celery_worker.sh /
#COPY ./entrypoint_celery_worker.sh /
RUN ["chmod", "+x", "/entrypoint_celery_worker.sh"]
#RUN ["chown", "django-user:django-user", "/entrypoint_celery_worker.sh"]

WORKDIR /src/

ENTRYPOINT ["/entrypoint_celery_worker.sh"]


# #############################################################################
# ############                   Dev image                           ##########
# #############################################################################
FROM app_base as app_dev

# Install the dev dependencies
COPY backend/requirements-dev.txt .
RUN /py/bin/pip install -r requirements-dev.txt


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# #############################################################################
# ############                   Test image 						###########
# #############################################################################

FROM app_dev as app_test
