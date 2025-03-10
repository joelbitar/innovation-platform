from .settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEBUG = True

SECRET_KEY = 'testing_secret_key'

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
        "OPTIONS": {
            "location": "/tmp/",
            "base_url": "/media/",
        },
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

MEDIA_ROOT = '/tmp/'

CACHES["default"] = {
    "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
}
