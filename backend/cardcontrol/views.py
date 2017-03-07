from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    url = request.build_absolute_uri()
    html = """<html><head><style>div {{margin: 0 25% 0 25%; width: auto; height: auto}} code {{ color: #3333DD}}</style></head><body><div><h1>Welcome to the CardControl app server!</h1><p>Make API requests as follows: </p><code>{}api/v1/[REST-QUERY]</code>,<p> e.g.</p> <code>{}/api/v1/card/1/</code> <p>or</p> <code>{}/api/v1/account/?utln=masnes01</code> <p>If in-browser, add <code>?format=json</code> to the end of the request, as most browsers will attempt to default to XML. <code>curl</code> and front-end frameworks should default to JSON.</p></body></html>""".format(url, url, url)
    return HttpResponse(html)
