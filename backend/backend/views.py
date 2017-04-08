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
import sys, pwd, os, pty

# From: https://simpleisbetterthancomplex.com/tutorial/2016/10/31/how-to-handle-github-webhooks-using-django.html

@require_POST
@csrf_exempt
def hook(request):
    f = open('/home/ec2-user/cardcontrol/log/webhook.log', 'a+')
    f.write("Got POST.\n")
    # Verify the request signature
    header_signature = request.META.get('HTTP_X_HUB_SIGNATURE')
    if header_signature is None:
        f.write('Could not find HTTP_X_HUB_SIGNATURE header.\n')
        f.close()
        return HttpResponseForbidden('Permission denied.')

    sha_name, signature = header_signature.split('=')
    if sha_name != 'sha1':
        f.write('Could not find sha1 field in HTTP_X_HUB_SIGNATURE header.\n')
        f.close()
        return HttpResponseServerError('Operation not supported.', status=501)

    mac = hmac.new(force_bytes(settings.GITHUB_WEBHOOK_KEY), msg=force_bytes(request.body), digestmod=sha1)
    if not hmac.compare_digest(force_bytes(mac.hexdigest()), force_bytes(signature)):
        f.write('Could not find sha1 field in HTTP_X_HUB_SIGNATURE header.\n')
        f.close()
        return HttpResponseForbidden('Permission denied.')

    # If request reached this point we are in a good shape
    # Process the GitHub events
    event = request.META.get('HTTP_X_GITHUB_EVENT', 'ping')

    if event == 'ping':
        return HttpResponse('pong')
    elif event == 'push':
        jdict = json.loads(request.body)
        if jdict['ref'] != "refs/heads/dev":
            f.write('Branch of push was not dev.\n')
            f.close()
            return HttpResponse(jdict['ref'], status=204)
        f.write("Beginning call to deploy script.\n")
        cmd = ['script', '--return', '-c', '"/home/ec2-user/cardcontrol/deploy.sh"', '/dev/null']
        pw_record = pwd.getpwnam('ec2-user')
        user_name = pw_record.pw_name
        user_home_dir = pw_record.pw_dir
        user_uid = pw_record.pw_uid
        user_gid = pw_record.pw_gid
        env = os.environ.copy()
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, preexec_fn=demote(user_uid, user_gid), start_new_session=True) 
        for line in p.stdout:
            f.write(line.decode('utf-8'))
        p.wait()
        f.write(str(p.returncode) + '\n')
        preexec_fn=demote(user_uid, user_gid)
        f.close()
        return HttpResponse('success')    

    # In case we receive an event that's not ping or push
    f.write('Request object was not ping or push.\n')
    f.close()
    return HttpResponse("request object not recognized", status=204)

def demote(user_uid, user_gid):
    os.setgid(user_gid)
    os.setuid(user_uid)
