#!/usr/bin/env sh
set -e
echo 'git pull ...'
git reset --hard origin/master
git clean -f
git pull

echo 'git pull complete ...'

echo 'npm run build ...'
npm run build

echo 'npm start ...'
pm2 restart server
