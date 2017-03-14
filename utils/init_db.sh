#!/bin/bash
d=$(dirname $0)
psql -d postgres -U postgres < $d/user_setup.sql


