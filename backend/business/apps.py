from django.apps import AppConfig


class BusinessConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'business'

    # Import signals
    def ready(self):
        import business.signals.business_area_slug
