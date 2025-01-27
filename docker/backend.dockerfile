FROM python:3.13-slim as ip_python

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

FROM ip_python as ip_base

WORKDIR /src

# Copy the source code
COPY backend /src

# Copy in the python packages
COPY --from=ip_python /py /py

# Set python path
ENV PATH="/py/bin:$PATH"


# #############################################################################
# ############                   App image                          ###########
# #############################################################################
FROM ip_base as ip_app

#COPY ./backend/uwsgi_params /
#COPY ./docker/backend_entrypoint.sh /
#RUN ["chmod", "+x", "/app_entrypoint.sh"]
#RUN ["chown", "django-user:django-user", "/app_entrypoint.sh"]

# Set environment variables from build args
ARG DJANGO_DEFAULT_DATABASE_URL
ARG DJANGO_SECRET_KEY
ARG DJANGO_STATIC_URL
ARG DJANGO_ALLOWED_HOSTS
ARG DJANGO_DEBUG

ENV DEFAULT_DATABASE_URL=$DJANGO_DEFAULT_DATABASE_URL
ENV SECRET_KEY=$DJANGO_SECRET_KEY
ENV STATIC_URL=$DJANGO_STATIC_URL
ENV MEDIA_URL=$DJANGO_MEDIA_URL
ENV ALLOWED_HOSTS=$DJANGO_ALLOWED_HOSTS
ENV DEBUG=$DJANGO_DEBUG

WORKDIR /src/


# #############################################################################
# ############                   Dev image                           ##########
# #############################################################################
FROM ip_app as ip_dev

# Install the dev dependencies
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# #############################################################################
# ############                   Test image 						###########
# #############################################################################

FROM ip_app as ip_test
