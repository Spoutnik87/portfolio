#/bin/bash

APPLICATION_NAME="portfolio"

# Clear logs
pm2 flush

# Start the application
pm2 start dist/app/server/main.js --name $APPLICATION_NAME --max-restarts 10  > /dev/null

# Wait some seconds while the application is starting
sleep 5

RESTART=$(pm2 -m ls | grep "\-\- $APPLICATION_NAME" -A 6 | grep "restarted" | egrep -o "[0-9]+$")

# Display logs
pm2 logs $APPLICATION_NAME --nostream --lines 200

# Check if application is running
if [ $RESTART -eq 0 ]; then
  echo "Application $APPLICATION_NAME is running."
  exit 0
else
  echo "Application $APPLICATION_NAME is not running. (it restarted $RESTART times)"
  pm2 delete $APPLICATION_NAME > /dev/null
  exit 1
fi