#!/bin/bash
# Install node.js and Forever.js
export APP_ROOT="/home/ubuntu/pando"
sudo rm -r $APP_ROOT
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs -y
sudo apt autoremove -y
sudo npm install forever -g || true
sudo forever stop app || true
sudo service mongod start || true
sudo npm install frontail -g || true