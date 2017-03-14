#!/bin/bash
d=$(dirname "$0")
psql -d postgres -U M < $d/bobby_tables.sql

