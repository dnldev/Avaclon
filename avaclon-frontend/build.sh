#!/bin/bash

npm run build
rm -r /var/www/html/avaclon
mv build /var/www/html/avaclon