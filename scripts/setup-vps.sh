#!/bin/bash
# One-command VPS setup for ERA DAL
# Usage: bash scripts/setup-vps.sh [your-domain.com]
set -e

DOMAIN=${1:-""}
APP_DIR="/opt/era-dal-web"
REPO="https://github.com/eukundrotas/era-dal-web"

echo "=== ERA DAL — VPS Setup ==="

# 1. System packages
echo "[1/6] Installing system packages..."
apt-get update -q
apt-get install -y -q git curl nginx certbot python3-certbot-nginx

# 2. Docker
echo "[2/6] Installing Docker..."
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
fi

# 3. Clone / update repo
echo "[3/6] Cloning repository..."
if [ -d "$APP_DIR" ]; then
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

# 4. Build & start with Docker Compose
echo "[4/6] Building and starting application..."
docker compose up -d --build app

# 5. Nginx config
echo "[5/6] Configuring Nginx..."
if [ -n "$DOMAIN" ]; then
  sed -i "s/your-domain.com/$DOMAIN/g" nginx.conf
  cp nginx.conf /etc/nginx/sites-available/era-dal
  ln -sf /etc/nginx/sites-available/era-dal /etc/nginx/sites-enabled/era-dal
  rm -f /etc/nginx/sites-enabled/default
  nginx -t && systemctl reload nginx
  echo "      SSL: run  certbot --nginx -d $DOMAIN"
else
  echo "      No domain provided — skipping Nginx. App runs on :3000"
fi

# 6. D1 database init
echo "[6/6] Initialising database..."
docker compose exec -T app npx wrangler d1 execute era-dal \
  --local --file=migrations/0001_init.sql 2>/dev/null || true

echo ""
echo "=== Done! ==="
if [ -n "$DOMAIN" ]; then
  echo "App:  http://$DOMAIN"
else
  echo "App:  http://$(curl -s ifconfig.me):3000"
fi
echo "Health: $(curl -s http://localhost:3000/api/health)"
