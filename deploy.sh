#!/bin/zsh
# Deploys the committed state of this repository to Hostpoint over SSH.
# Run from your Mac:
#   ./deploy.sh               staging    https://stahlmann.ch.marceli.to
#   ./deploy.sh production    https://stahlmann.ch
# Add --dry-run to only show what would change.
#
# The site is built locally into dist/ and synced to the domain's web root. On staging an
# .htaccess with a noindex header and a robots.txt that blocks all crawlers are added.
# .well-known/ on the server is never deleted.
set -euo pipefail
cd "$(dirname "$0")"

# TODO: production host and web root, once stahlmann.ch is set up
HOST_PRODUCTION=
WEBROOT_PRODUCTION=
HOST_STAGING=pumutuxu@marceli.to
WEBROOT_STAGING=/home/pumutuxu/www/stahlmann.ch/public

TARGET=staging
DRY_RUN=()
for arg in "$@"; do
  case $arg in
    staging|production) TARGET=$arg ;;
    --dry-run) DRY_RUN=(--dry-run --itemize-changes) ;;
    *) echo "Usage: ./deploy.sh [staging|production] [--dry-run]"; exit 1 ;;
  esac
done

if [[ $TARGET == production ]]; then
  URL=https://stahlmann.ch
  HOST=$HOST_PRODUCTION
  DEST=$WEBROOT_PRODUCTION
else
  URL=https://stahlmann.ch.marceli.to
  HOST=$HOST_STAGING
  DEST=$WEBROOT_STAGING
fi
if [[ -z $HOST || -z $DEST ]]; then
  echo "The host or web root for $TARGET is not set yet (top of deploy.sh)."
  exit 1
fi

if [[ -n $(git status --porcelain) ]]; then
  echo "You have uncommitted changes. Commit them first; only committed code is deployed."
  exit 1
fi

export NVM_DIR="$HOME/.nvm"
[[ -s $NVM_DIR/nvm.sh ]] && source "$NVM_DIR/nvm.sh" && nvm use --silent

STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
# mktemp creates the folder as 700; rsync would copy that onto the web root and lock out the web server.
chmod 755 "$STAGE"

echo "Building $(git rev-parse --short HEAD) for $URL…"
git archive HEAD | tar -x -C "$STAGE"
ln -s "$PWD/node_modules" "$STAGE/node_modules"
# SITE_URL: absolute URLs in the build (canonical, OG, sitemap, llms.txt) point to the domain being deployed
(cd "$STAGE" && SITE_URL=$URL npm run build --silent)

# Keep staging out of search engines
if [[ $TARGET == staging ]]; then
  printf '# Staging only (added by deploy.sh)\nHeader set X-Robots-Tag "noindex, nofollow"\n' >> "$STAGE/dist/.htaccess"
  printf 'User-agent: *\nDisallow: /\n' > "$STAGE/dist/robots.txt"
fi

# Folders 755, files 644 (macOS ships openrsync, which has no --chmod)
chmod -R u=rwX,go=rX "$STAGE/dist"

echo "Uploading to $TARGET…"
# One connection: the remote side creates the web root before rsync starts
rsync -rlptz --delete "${DRY_RUN[@]}" \
  --rsync-path "mkdir -p '$DEST' && rsync" \
  --filter 'protect /.well-known/' \
  "$STAGE/dist/" "$HOST:$DEST/"

if (( ${#DRY_RUN} )); then
  echo "Dry run only, nothing was changed."
else
  echo "Deployed $(git rev-parse --short HEAD) to $URL"
fi
