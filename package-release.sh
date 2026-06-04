#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  ERA DAL — Build Release ZIP
#  Creates era-dal-v{version}.zip ready for download and distribution.
# ─────────────────────────────────────────────────────────────────────────────
set -e

VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")
OUT="era-dal-v${VERSION}"
ZIP="${OUT}.zip"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

echo ""
echo -e "${BLUE}ERA DAL — Building release package v${VERSION}${NC}"
echo "────────────────────────────────────────────"

# Clean
rm -rf "$OUT" "$ZIP"
mkdir -p "$OUT"

# Build production assets
echo -e "${YELLOW}→ Building production bundle...${NC}"
npm run build

# Copy files into release dir
echo -e "${YELLOW}→ Copying files...${NC}"
cp -r dist          "$OUT/dist"
cp -r migrations    "$OUT/migrations"
cp -r public        "$OUT/public"
cp -r src           "$OUT/src"
cp    package.json  "$OUT/package.json"
cp    package-lock.json "$OUT/package-lock.json" 2>/dev/null || true
cp    wrangler.jsonc "$OUT/wrangler.jsonc"
cp    vite.config.ts "$OUT/vite.config.ts"
cp    tsconfig.json "$OUT/tsconfig.json"
cp    start.sh           "$OUT/start.sh"
cp    start.bat          "$OUT/start.bat"
cp    setup.sh           "$OUT/setup.sh"
cp    era-dal-launcher.vbs  "$OUT/era-dal-launcher.vbs"
cp    install-windows.ps1   "$OUT/install-windows.ps1"
cp    README.md          "$OUT/README.md" 2>/dev/null || true

# Make scripts executable inside zip
chmod +x "$OUT/start.sh" "$OUT/setup.sh"

# Create zip
echo -e "${YELLOW}→ Creating ZIP archive...${NC}"
if command -v zip &>/dev/null; then
  zip -r "$ZIP" "$OUT" -x "*/node_modules/*" -x "*/.wrangler/*"
elif command -v 7z &>/dev/null; then
  7z a "$ZIP" "$OUT" -x"!*/node_modules" -x"!*/.wrangler"
else
  tar -czf "${OUT}.tar.gz" "$OUT"
  ZIP="${OUT}.tar.gz"
fi

# Cleanup temp dir
rm -rf "$OUT"

SIZE=$(du -sh "$ZIP" | cut -f1)
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Release ready: ${BLUE}${ZIP}${GREEN} (${SIZE})${NC}"
echo ""
echo -e "  Users unzip and run:"
echo -e "  ${BLUE}  ./setup.sh   ${NC}  (first time)"
echo -e "  ${BLUE}  ./start.sh   ${NC}  (every time after)"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
