#!/bin/bash
# Script to initialize the environment

set -e  # Exit immediately if a command fails

echo "Starting Docker containers..."
docker-compose up -d --build

echo "Environment initialized successfully."
