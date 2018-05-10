#!/usr/bin/env sh
set -e
echo 'git pull ...'
git reset --hard origin/master
git clean -f
git pull

echo 'git pull complete ...'

pm2 restart build

echo 'npm run build ...'
npm run build

echo 'npm restart ...'
pm2 restart start
