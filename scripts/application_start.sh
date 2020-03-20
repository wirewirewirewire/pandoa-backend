#!/bin/bash
export APP_ROOT="/home/ubuntu/pando"
sudo forever stopall
sudo forever stop app
sudo forever --uid app --killSignal=SIGTERM --workingDir $APP_ROOT/ -p $APP_ROOT/../log/ -l $APP_ROOT/../log/api.log start $APP_ROOT/server.js
sudo frontail -p 9001 -n 100 -U user -P admin --ui-highlight -d --pid-path $APP_ROOT/../frontail.pid $APP_ROOT/../log/api.log