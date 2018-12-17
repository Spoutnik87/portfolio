#/bin/bash

APPLICATION_NAME="cv_angular"

# Start the application
pm2 start dist/app/server/main.js --name $APPLICATION_NAME

# Check if application is running
sleep 3

RESTART=$(pm2 -m ls | grep "\-\- $APPLICATION_NAME" -A 6 | grep "restarted" | grep -oP "\d+$")

if [ "$RESTART" -ne 0 ]; then
  echo "Application $APPLICATION_NAME is not running."
  pm2 delete $APPLICATION_NAME
  exit 1
else
  echo "Application $APPLICATION_NAME is running."
  exit 0
fi