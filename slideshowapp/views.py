from django.shortcuts import render_to_response
from django.http import HttpResponse, Http404
from django.template import RequestContext

def index(request):
	return render_to_response('index.html', [],
                              context_instance=RequestContext(request))

def selectpictures(request):
	return render_to_response('selectpictures.html', [], context_instance=RequestContext(request))