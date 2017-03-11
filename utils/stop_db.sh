#!/bin/bash
pid=$(ps auxww | grep 'postmaster' | grep -v 'grep' | awk '{print $2}')
sudo kill $pid

