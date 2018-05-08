#!/usr/bin/env sh
set -e
echo 'git pull ...'
git reset --hard origin/master
git clean -f
git pull

echo 'pm2 stop server ...'
pm2 stop server

echo 'npm run build ...'
npm run build

echo 'npm run build ...'
npm run start
# npm run www
