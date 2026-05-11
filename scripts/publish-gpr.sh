#!/bin/bash
set -ex

# Создаём .npmrc с GPR auth
cat > ~/.npmrc <<EOF
@ukituki-ps:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN:?NODE_AUTH_TOKEN not set}
EOF

# Publish tokens
cd packages/tokens
npm publish --access restricted 2>&1 || echo "SKIP tokens: already published"

# Publish ui
cd ../ui
npm publish --access restricted 2>&1 || echo "SKIP ui: already published"

# Restore .npmrc
rm -f ~/.npmrc
