import logging

from django.core.exceptions import ImproperlyConfigured
from redis import RedisError, Redis

from django.conf import settings


class RedisClient:
    def __init__(self):
        self.__redis_client = self.__create_redis_client()

    def get_redis_client(self):
        if self.__redis_client is None:
            logging.error('Could not set value in Redis, missing redis client')
            raise ImproperlyConfigured('Could not set value in Redis, missing redis client')

        return self.__redis_client

    @property
    def redis_client(self) -> Redis:
        return self.get_redis_client()

    @classmethod
    def __get_redis_configuration(cls):
        return {
            'host': settings.REDIS_URL.hostname,
            'port': settings.REDIS_URL.port,
        }

    @classmethod
    def __create_redis_client(cls) -> Redis:
        try:
            return Redis(**cls.__get_redis_configuration())
        except AttributeError as e:
            logging.error('AttributeError while instantiating Redis client, possibly setting for redis url is wrong (missing port or not valid hostname)')
            logging.info(
                str(e)
            )

    def set(self, key, value):
        try:
            self.redis_client.set(key, value)
        except RedisError as e:
            logging.error(
                'Error while write to connect to redis'
            )
            logging.error(
                str(e)
            )

    def delete(self, param):
        try:
            self.redis_client.delete(param)
        except RedisError as e:
            logging.error(
                'Error while delete on redis'
            )
            logging.error(
                str(e)
            )
