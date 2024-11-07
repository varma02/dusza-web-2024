#!/bin/bash

# Variables
REPO_DIR="/home/dusza/dusza-web-2024"
APP_NAME="dusza-web-2024"
CHECK_INTERVAL=60  # Check every 60 seconds

#Derived
CI_SCREEN_NAME="${APP_NAME}_ci"

# Function to start a screen or restart if already running
start_screen() {
  local screen_name=$1
  local command=$2

  if screen -list | grep -q "$screen_name"; then
    screen -S $screen_name -X quit
  fi
  screen -dmS "$screen_name" bash -c "$command"
}

# Function to check for updates and restart the application if needed
check_and_restart() {
  # Pull latest changes from GitHub
  cd $REPO_DIR
  git fetch origin main

  # Check if there are any new changes
  if git diff --quiet HEAD origin/main; then
    echo "No changes detected. Checking again in $CHECK_INTERVAL seconds."
  else
    echo "Pulling changes..."
    
    # Pull the latest changes
    git pull origin main

    # Install dependencies
    npm install

    # Apply database migrations
    npx prisma migrate deploy

    # Start a new screen session and run the application
    start_screen $APP_NAME "cd $REPO_DIR && npm run start"
  fi
}

# Function to start the CI script in a screen session
start_ci() {
  start_screen $APP_NAME "cd $REPO_DIR && npm run start"
  start_screen $CI_SCREEN_NAME "$0 inside_screen"
}

# Function to stop the CI script
stop_ci() {
  screen -S $CI_SCREEN_NAME -X quit
  echo "CI script stopped."
}

# Handle arguments
case "$1" in
  start)
    start_ci
    ;;
  stop)
    stop_ci
    ;;
  inside_screen)
    while true; do
      check_and_restart
      sleep $CHECK_INTERVAL
    done
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
