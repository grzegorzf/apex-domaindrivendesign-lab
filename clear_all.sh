#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Stopping and tearing down Apex Domain-Driven Design Lab containers & volumes..."
docker compose down -v --remove-orphans 2>/dev/null || true
docker builder prune -f 2>/dev/null || true

echo "Cleaning Apex Domain-Driven Design Lab build artifacts..."
rm -rf frontend/.next frontend/out frontend/node_modules

echo "Apex Domain-Driven Design Lab cleanup completed."
