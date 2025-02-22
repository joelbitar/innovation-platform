import logging

from django.core.exceptions import ImproperlyConfigured
from redis import RedisError, Redis

from django.conf import settings


class RedisClient:
    def __init__(self):
        self.redis = self.__get_client()

    @classmethod
    def __get_client(cls) -> Redis:
        try:
            return Redis(host=settings.REDIS_URL.hostname, port=settings.REDIS_URL.port)
        except ImproperlyConfigured as e:
            logging.error('Configuration error while instantiating Redis client')
            logging.info(
                str(e)
            )
        except AttributeError as e:
            logging.error('Attribute error while instantiating Redis client, possibly missing redis configuration')
            logging.info(
                str(e)
            )

    def set(self, key, value):
        try:
            self.redis.set(key, value)
        except RedisError as e:
            logging.error(
                str(e)
            )
        except AttributeError as e:
            logging.error('Could not set value in Redis, possibly missing redis client')
            logging.info(
                str(e)
            )

    def delete(self, param):
        try:
            self.redis.delete(param)
        except RedisError as e:
            logging.error(
                str(e)
            )
        except AttributeError as e:
            logging.error('Could not delete value in Redis, possibly missing redis client')
            logging.info(
                str(e)
            )
