# Test to clear expired sessions from the database with the celery task
from unittest.mock import patch

from django.test import TestCase


class TestClearExpiredSessionsCommand(TestCase):
    @patch('django.core.management.call_command')
    def test_should_clear_expired_sessions(self, mocked_call_command):
        from user.tasks import clear_expired_sessions

        clear_expired_sessions()

        mocked_call_command.assert_called_with('clearsessions')
