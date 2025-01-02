#!/bin/bash
# Script to collect static files

set -e  # Exit immediately if a command fails

# Hardcoded Django container name
container_name="sightseeing_map_sightseeing_map_1"

# Check if the container is running
if ! docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
  echo "Error: Container ${container_name} is not running."
  exit 1
fi

echo "Collecting static files from container: $container_name..."
docker exec "$container_name" python manage.py collectstatic --noinput

echo "Static files collected successfully."
