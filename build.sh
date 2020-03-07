#!/bin/bash

cd avaclon-frontend
npm install
npm run build
rm -r /var/www/html/avaclon
mv build /var/www/html/avaclon
forever stop 0
cp -a ../server/. /srv/avaclon-server
cd /srv/avaclon-server
npm install
forever start /srv/avaclon-server/server.js