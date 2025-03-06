from unittest.mock import patch

from django.conf import settings
from django.test import SimpleTestCase, override_settings
from environ import environ

from lib.redis.redis_client import RedisClient


class RedisClientTests(SimpleTestCase):
    # Test that we can instantiate a RedisClient object
    def test_instantiate(self):
        redis_client = RedisClient()
        self.assertIsInstance(
            redis_client,
            RedisClient,
        )

    # Test should throw error iw we can not instantiate redis client due to malformed redis url
    @override_settings(REDIS_URL='http://åäö.com')
    def test_should_log_error_iw_we_can_not_instantiate_redis_client_due_to_malformed_redis_url(self):
        self.assertEqual(
            'http://åäö.com',
            settings.REDIS_URL,
        )

        with self.assertLogs(logger='root', level='ERROR') as cm:
            RedisClient()
            self.assertGreater(
                len(cm.output),
                0,
            )
            self.assertIn(
                'ERROR:root:AttributeError while instantiating Redis client, possibly setting for redis url is wrong (missing port or not valid hostname)',
                cm.output,
            )

    # test should clear redis after we blacklist token
    @override_settings(REDIS_URL=environ.Env().url('REDIS_URLS', 'redis://localhost:6379/0'))
    def test_should_throw_exception_if_we_can_not_delete(self):
        redis_client = RedisClient()

        with self.assertLogs(logger='root', level='ERROR') as cm:
            redis_client.delete('test_key')

            self.assertIn(
                'ERROR:root:Error while delete on redis',
                cm.output,
            )

    # test should clear redis after we blacklist token
    @override_settings(REDIS_URL=environ.Env().url('REDIS_URLS', 'redis://localhost:6379/0'))
    def test_should_throw_exception_if_we_can_not_set(self):
        redis_client = RedisClient()

        with self.assertLogs(logger='root', level='ERROR') as cm:
            redis_client.set('test_key', 'test_value')

            self.assertIn(
                'ERROR:root:Error while write to connect to redis',
                cm.output,
            )
