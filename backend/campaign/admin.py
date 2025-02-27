from django.contrib import admin

# Register your models here.

from .models import Campaign, CampaignRound

admin.site.register(Campaign)
admin.site.register(CampaignRound)