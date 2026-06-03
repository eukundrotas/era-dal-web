#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  ERA DAL — Local Launcher  (Linux / macOS)
# ─────────────────────────────────────────────────────────────────────────────
set -e

BLUE='\033[0;34m'; PURPLE='\033[0;35m'; GREEN='\033[0;32m'
YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo ""
echo -e "${PURPLE}  ███████╗██████╗  █████╗      ██████╗  █████╗ ██╗  ${NC}"
echo -e "${PURPLE}  ██╔════╝██╔══██╗██╔══██╗     ██╔══██╗██╔══██╗██║  ${NC}"
echo -e "${BLUE}  █████╗  ██████╔╝███████║     ██║  ██║███████║██║  ${NC}"
echo -e "${BLUE}  ██╔══╝  ██╔══██╗██╔══██║     ██║  ██║██╔══██║██║  ${NC}"
echo -e "${PURPLE}  ███████╗██║  ██║██║  ██║     ██████╔╝██║  ██║███████╗${NC}"
echo -e "${PURPLE}  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚═╝  ╚═╝╚══════╝${NC}"
echo ""
echo -e "${BLUE}  Digital AI Layer — Meta-Orchestrator Platform${NC}"
echo -e "${YELLOW}  ─────────────────────────────────────────────${NC}"
echo ""

# ── Check Node.js ────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo -e "${RED}✗ Node.js not found. Install from https://nodejs.org (v18+)${NC}"
  exit 1
fi
NODE_VER=$(node -v)
echo -e "${GREEN}✓ Node.js $NODE_VER${NC}"

# ── Install dependencies ──────────────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}→ Installing dependencies...${NC}"
  npm install
  echo -e "${GREEN}✓ Dependencies installed${NC}"
else
  echo -e "${GREEN}✓ Dependencies ready${NC}"
fi

# ── Build ─────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}→ Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"

# ── Initialize D1 database ───────────────────────────────────────────────────
echo -e "${YELLOW}→ Initializing database...${NC}"
if npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql 2>/dev/null; then
  echo -e "${GREEN}✓ Database ready${NC}"
else
  echo -e "${YELLOW}⚠ Database already initialized or wrangler D1 unavailable — continuing${NC}"
fi

# ── Launch ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 ERA DAL is starting...${NC}"
echo -e "${BLUE}  Open: http://localhost:8788${NC}"
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Press ${RED}Ctrl+C${NC} to stop"
echo ""

npx wrangler pages dev --port 8788
