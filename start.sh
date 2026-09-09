#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Parse CLI flags: -f, --logs, or --foreground to stream container logs after boot
ATTACH_LOGS=false
LOCAL_MODE=false

for arg in "$@"; do
  case $arg in
    -f|--logs|--foreground)
      ATTACH_LOGS=true
      ;;
    --local|--native|--dev)
      LOCAL_MODE=true
      ;;
  esac
done

if [ "$LOCAL_MODE" = true ]; then
  echo "Starting Apex Domain-Driven Design Lab in local development mode (pnpm)..."
  cd frontend
  pnpm run dev
  exit 0
fi

echo "=================================================="
echo "🚀 Starting Apex Domain-Driven Design Lab"
echo "=================================================="

# Load environment variables
if [ -f ../.env ]; then
  echo "Loading root .env file..."
  export $(grep -v '^#' ../.env | xargs -0) 2>/dev/null || true
fi

if [ -f .env ]; then
  echo "Loading local .env file..."
  export $(grep -v '^#' .env | xargs -0) 2>/dev/null || true
elif [ -f .env.example ]; then
  cp .env.example .env
fi

echo "Stopping any existing containers..."
docker compose down --remove-orphans 2>/dev/null || true

echo "Starting Apex Domain-Driven Design Lab containers in daemon mode..."
docker compose up --build -d

echo ""
echo "=================================================="
echo "✅ Apex Domain-Driven Design Lab running in background!"
echo "=================================================="
echo "• Frontend Studio: http://localhost:3017"
echo ""
echo "To stream live logs:  docker compose logs -f (or ./start.sh -f)"
echo "To run natively:      ./start.sh --local"
echo "To stop all services: docker compose down (or ./clear_all.sh)"
echo "=================================================="
echo ""

if [ "$ATTACH_LOGS" = true ]; then
  echo "Attaching to live container logs (Press Ctrl+C to stop log stream; containers will keep running)..."
  docker compose logs -f
fi
