"""
Backend, infrastructure-related views unrelated to the main CardControl
application Currently the only view is the handling of requests sent by
the GitHub webhook.
"""

import os
import pwd
import subprocess
import json
import hmac
from hashlib import sha1

from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden
from django.http import HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils.encoding import force_bytes

BRANCH = "dev"


@require_POST
@csrf_exempt
def hook(request):
    """
    View to set up GitHub webhook. This hook handles post requests from GitHub,
    which are sent whenever a new push is made to the relevant branch of our
    GitHub repository. When a POST request is made, we first validate that the
    request is valid, while writing to a log, and then make a system-level
    execution of the deploy script which updates the git repository.
    """
    log = open('/home/ec2-user/cardcontrol/log/webhook.log', 'a+')
    log.write("Got POST.\n")
    # Verify the request signature
    header_signature = request.META.get('HTTP_X_HUB_SIGNATURE')
    if header_signature is None:
        log.write('Could not find HTTP_X_HUB_SIGNATURE header.\n')
        log.close()
        return HttpResponseForbidden('Permission denied.')

    sha_name, signature = header_signature.split('=')
    if sha_name != 'sha1':
        log.write('Could not find sha1 field in HTTP_X_HUB_SIGNATURE header.\n')
        log.close()
        return HttpResponseServerError('Operation not supported.', status=501)

    mac = hmac.new(force_bytes(settings.GITHUB_WEBHOOK_KEY),
                   msg=force_bytes(request.body), digestmod=sha1)
    if not hmac.compare_digest(force_bytes(mac.hexdigest()),
                               force_bytes(signature)):
        log.write('Could not find sha1 field in HTTP_X_HUB_SIGNATURE header.\n')
        log.close()
        return HttpResponseForbidden('Permission denied.')

    # If request reached this point we are in a good shape
    # Process the GitHub events
    event = request.META.get('HTTP_X_GITHUB_EVENT', 'ping')

    if event == 'ping':
        return HttpResponse('pong')
    elif event == 'push':
        jdict = json.loads(request.body)
        if jdict['ref'] != "refs/heads/" + BRANCH:
            log.write('Branch of push was not ' + BRANCH + '\n')
            log.close()
            return HttpResponse(jdict['ref'], status=204)
        log.write("Beginning call to deploy script.\n")
        cmd = ['script', '--return', '-c',
               '"/home/ec2-user/cardcontrol/server/deploy.sh"',
               '/dev/null']
        pw_record = pwd.getpwnam('ec2-user')
        user_uid = pw_record.pw_uid
        user_gid = pw_record.pw_gid
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE,
                                stdout=subprocess.PIPE,
                                preexec_fn=demote(user_uid, user_gid),
                                start_new_session=True)
        for line in proc.stdout:
            log.write(line.decode('utf-8'))
        proc.wait()
        log.write(str(proc.returncode) + '\n')
        log.close()
        return HttpResponse('Delivered; process spawned. Check server log.')

    # In case we receive an event that's not ping or push
    log.write('Request object was not ping or push.\n')
    log.close()


def demote(user_uid, user_gid):
    """
    Set the os processes spawned to have the given user and user_id, since
    we don't want to run them as root, but Django runs as root.
    """
    os.setgid(user_gid)
    os.setuid(user_uid)
