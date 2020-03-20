#!/bin/bash
export APP_ROOT="/home/ubuntu/pando"
sudo rm $APP_ROOT/../log/api.log || true
sudo mkdir $APP_ROOT/../log/ || true
sudo cp -r $APP_ROOT/../static/. $APP_ROOT/ || true
cd $APP_ROOT/
sudo npm install
sudo npm install nodemon
