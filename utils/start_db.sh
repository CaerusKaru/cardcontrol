#!/bin/bash
sudo su - postgres
/usr/local/pgsql/bin/postmaster -D /usr/local/pgsql/data > /usr/local/pgsql/logs/logfile 2>&1

