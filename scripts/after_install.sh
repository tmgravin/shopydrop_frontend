#!/bin/bash
cd /home/ec2-user/next
sudo rm -rf node_modules
sudo rm -rf package-lock.json
sudo npm install
sudo npm run build
