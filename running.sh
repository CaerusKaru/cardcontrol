#!/bin/bash
ps ax | grep -E "angular|runserve|nginx|uwsgi|postgres|psql|pgsql" | grep -v grep
