from django.contrib import admin

# Register your models here.
from .models import Idea, RoundVoteCount, Vote, Information

admin.site.register(Idea)
admin.site.register(RoundVoteCount)
admin.site.register(Vote)
admin.site.register(Information)