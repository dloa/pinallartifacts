#!/bin/bash
cd /home/roerick/pinbotwizard/nodejs
/usr/local/node/bin/node dloaAutopin.js | /usr/local/bin/pinfiles > /home/roerick/logs/pinfiles.log 2>&1
