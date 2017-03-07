#!/bin/bash
d=`dirname "$0"`
psql -d postgres < $d/bobby_tables.sql

