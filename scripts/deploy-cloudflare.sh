#!/bin/bash
# Deploy to Cloudflare Pages + create D1 database
# Prerequisites: wrangler installed and logged in (wrangler login)
set -e

PROJECT="era-dal-web"
DB_NAME="era-dal-contacts"

echo "=== Deploying ERA DAL to Cloudflare Pages ==="

# 1. Build
echo "[1/4] Building..."
npm run build

# 2. Create D1 database (idempotent)
echo "[2/4] Creating D1 database..."
DB_ID=$(npx wrangler d1 create "$DB_NAME" 2>/dev/null | grep -oP 'database_id = "\K[^"]+' || true)
if [ -z "$DB_ID" ]; then
  DB_ID=$(npx wrangler d1 list 2>/dev/null | grep "$DB_NAME" | awk '{print $2}' || true)
fi
echo "      D1 id: $DB_ID"

# Patch wrangler.jsonc with real DB id
if [ -n "$DB_ID" ]; then
  sed -i "s/\"database_id\": \"\"/\"database_id\": \"$DB_ID\"/" wrangler.jsonc || true
fi

# 3. Apply migrations
echo "[3/4] Applying migrations..."
npx wrangler d1 execute "$DB_NAME" --file=migrations/0001_init.sql --remote || true

# 4. Deploy
echo "[4/4] Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name "$PROJECT"

echo ""
echo "=== Done! ==="
echo "URL: https://$PROJECT.pages.dev"
echo "To add a custom domain, go to: Cloudflare Dashboard → Pages → $PROJECT → Custom Domains"
