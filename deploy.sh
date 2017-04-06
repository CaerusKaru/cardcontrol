#!/bin/bash
sleep 5
~/cardcontrol/stop.sh && git -C ~/cardcontrol/ stash && git -C ~/cardcontrol/ checkout deploy && git -C ~/cardcontrol/ pull origin deploy && ~/cardcontrol/start.sh

