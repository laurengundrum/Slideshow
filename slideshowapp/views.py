from django.shortcuts import render_to_response
from django.http import HttpResponse, Http404

@ensure_csrf_cookie
def index(request):
	return render_to_response('selectpictures.html')