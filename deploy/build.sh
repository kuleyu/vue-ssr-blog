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

echo 'npm run start ...'
npm start

echo 'commit build files ...'
git add .
git commit -m 'commit by server shell for build restart'
git push

echo 'push complete ...'
# npm run www
