import logging

from celery import shared_task

s = """
@app.on_after_finalize.connect
def setup_periodic_tasks(sender: Celery, **kwargs):
    print('hello, world. periodic task')
    sender.add_periodic_task(
        10.0,  # Every minute
        clear_expired_sessions.s(),
        name='clear expired sessions'
    )


@app.task
def clear_expired_sessions():
    from django.core.management import call_command

    print('Clearing expired sessions..')
    logging.log('Clearing expired sessions..')
    call_command('clearsessions')
"""

@shared_task
def temp_task(x, y):
    print(f'Adding {x} and {y}')
    return x + y
