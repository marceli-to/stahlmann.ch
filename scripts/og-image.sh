#!/bin/zsh
# Renders public/og-image.jpg (1200×630) from the template page src/pages/og.astro.
# Usage: npm run og   (needs Google Chrome, or Chromium from Playwright)
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [[ ! -x $CHROME ]]; then
  CHROME=$(ls -d "$HOME"/Library/Caches/ms-playwright/chromium-*/chrome-mac*/*.app/Contents/MacOS/* 2>/dev/null | tail -1)
fi
[[ -x ${CHROME:-} ]] || { echo "No Chrome found (install Google Chrome or run: npx playwright install chromium)"; exit 1; }

PORT=4329
npm run build --silent
npx astro preview --port $PORT >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill $PREVIEW 2>/dev/null' EXIT
for _ in {1..50}; do curl -sf "http://localhost:$PORT/og/" >/dev/null && break; sleep 0.2; done

PNG=$(mktemp -t og).png
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=3000 --screenshot="$PNG" "http://localhost:$PORT/og/" 2>/dev/null
sips -s format jpeg -s formatOptions 88 "$PNG" --out public/og-image.jpg >/dev/null
rm -f "$PNG"
echo "Wrote public/og-image.jpg"
