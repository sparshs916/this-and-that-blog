#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Apply database migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Execute the command passed to the script (e.g., npm run dev)
exec "$@"
