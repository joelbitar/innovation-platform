from celery import shared_task


@shared_task
def clear_expired_sessions():
    from django.core.management import call_command
    return call_command('clearsessions')
