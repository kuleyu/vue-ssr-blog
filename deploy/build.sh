#! /bin/bash
git reset --hard origin/master
git clean -f
git pull
pm2 stop server
npm run start
# npm run www