#!/bin/bash
ps ax | grep -E "angular|redis|varnish|runserve|nginx|uwsgi|postgres|psql|pgsql" | grep -v grep
