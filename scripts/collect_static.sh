#!/bin/bash
# Script to collect static files

set -e  # Exit immediately if a command fails

# Find the correct Django container dynamically
container_name=$(docker ps --filter "name=sightseeing_map" --format "{{.Names}}" | head -n 1)

if [ -z "$container_name" ]; then
  echo "Error: No container found for the Django service."
  exit 1
fi

echo "Collecting static files from container: $container_name..."
docker exec "$container_name" python manage.py collectstatic --noinput

echo "Static files collected successfully."
