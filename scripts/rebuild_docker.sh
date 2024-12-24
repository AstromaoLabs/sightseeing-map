#!/bin/bash
# Script to rebuild Docker containers

set -e  # Exit immediately if a command fails

echo "Stopping existing containers..."
docker-compose down

echo "Removing static volume if it exists..."
docker volume rm ${STATIC_VOLUME} || echo "No static volume found. Continuing..."

echo "Building and starting containers..."
docker-compose up -d --build

echo "Docker containers rebuilt and started successfully."
