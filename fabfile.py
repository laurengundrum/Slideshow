from fabric.contrib import django
from fabric.api import local
import os
import sys

sys.path.append('/Users/andrewbrown/Developer/Slideshow')
os.environ['DJANGO_SETTINGS_MODULE'] = 'slideshowapp.settings'
from django.conf import settings

def deploy():
	"Checks that Debug=False and pushes to Heroku"
	if settings.DEBUG is True or settings.TEMPLATE_DEBUG is True:
		print "Set DEBUG and TEMPLATE_DEBUG to False before deploying"
	else:
		local("cd ~/Developer/Slideshow/; python manage.py collectstatic --noinput; git push heroku master")