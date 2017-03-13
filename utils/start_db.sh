#!/bin/bash
cd /usr/local/pgsql
sudo -u postgres /usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data/ -l /usr/local/pgsql/logs/logfile start

