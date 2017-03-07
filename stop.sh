pids=$(ps auxww | grep -E "angular|postgres M|runserve" | grep -v grep | awk '{print $2}')
for pid in $pids; do
	echo "Killing PID $pid"
	sudo kill $pid
done;

