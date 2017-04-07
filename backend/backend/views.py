import hmac
from hashlib import sha1

from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils.encoding import force_bytes

import requests
from ipaddress import ip_address, ip_network
import subprocess
import json

# From: https://simpleisbetterthancomplex.com/tutorial/2016/10/31/how-to-handle-github-webhooks-using-django.html

@require_POST
@csrf_exempt
def hook(request):
    # Verify the request signature
    header_signature = request.META.get('HTTP_X_HUB_SIGNATURE')
    if header_signature is None:
        return HttpResponseForbidden('Permission denied.')

    sha_name, signature = header_signature.split('=')
    if sha_name != 'sha1':
        return HttpResponseServerError('Operation not supported.', status=501)

    mac = hmac.new(force_bytes(settings.GITHUB_WEBHOOK_KEY), msg=force_bytes(request.body), digestmod=sha1)
    if not hmac.compare_digest(force_bytes(mac.hexdigest()), force_bytes(signature)):
        return HttpResponseForbidden('Permission denied.')

    # If request reached this point we are in a good shape
    # Process the GitHub events
    event = request.META.get('HTTP_X_GITHUB_EVENT', 'ping')


    if event == 'ping':
        return HttpResponse('pong')
    elif event == 'push':
        jdict = json.loads(request.body)
        if jdict['ref'] != "refs/heads/deploy":
            return HttpResponse(jdict['ref'], status=204)
        bash_c = "sudo -u ec2-user /home/ec2-user/cardcontrol/deploy.sh &"
        process = subprocess.Popen(bash_c.split(), stdout=subprocess.PIPE)
        output, error = process.communicate()
        return HttpResponse('success')    

    # In case we receive an event that's not ping or push
    return HttpResponse("request object not recognized", status=204)
