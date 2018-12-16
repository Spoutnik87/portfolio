#/bin/bash

exec -a cv_angular node dist/app/server/main.js &

PID=$!

sleep 2

if ps -p $PID > /dev/null; then
  echo "Server is running."
  exit 0
else
  echo "Server is not running."
  wait $PID
  exit $?
fi
