#!/bin/bash
# Script for full deployment process

set -e  # Exit immediately if a command fails

echo "Step 1: Rebuilding Docker containers..."
./scripts/rebuild_docker.sh

echo "Step 2: Collecting static files..."
./scripts/collect_static.sh

echo "Deployment completed successfully."
