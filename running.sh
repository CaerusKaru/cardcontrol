#!/bin/bash
ps ax | grep -E "angular|grip|redis|varnish|runserve|nginx|uwsgi|postgres|psql|pgsql" | grep -v grep
