#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  ERA DAL — First-time Setup  (Linux / macOS)
#  Run once after cloning or unpacking the ZIP.
# ─────────────────────────────────────────────────────────────────────────────
set -e

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'
RED='\033[0;31m'; NC='\033[0m'

echo ""
echo -e "${BLUE}ERA DAL — Setup${NC}"
echo "────────────────────────────────────"
echo ""

# Node.js check
if ! command -v node &>/dev/null; then
  echo -e "${RED}✗ Node.js not found.${NC}"
  echo "  Install Node.js v18+ from https://nodejs.org"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Install deps
echo -e "${YELLOW}→ Installing npm packages...${NC}"
npm install
echo -e "${GREEN}✓ Packages installed${NC}"

# Build
echo -e "${YELLOW}→ Building...${NC}"
npm run build
echo -e "${GREEN}✓ Build OK${NC}"

# D1 database init
echo -e "${YELLOW}→ Creating local database...${NC}"
npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql 2>/dev/null && \
  echo -e "${GREEN}✓ Database created${NC}" || \
  echo -e "${YELLOW}⚠ Database already exists — skipping${NC}"

# Make start.sh executable
chmod +x start.sh 2>/dev/null || true

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo ""
echo -e "  To start ERA DAL:"
echo -e "  ${BLUE}  ./start.sh${NC}       (this terminal)"
echo -e "  ${BLUE}  npm run local${NC}    (same thing)"
echo ""
echo -e "  Then open: ${BLUE}http://localhost:8788${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
