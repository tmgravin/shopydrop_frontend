#!/bin/bash

# Navigate to the correct directory
cd /home/ec2-user/next
sudo su
# Install dependencies
npm install
npm run build
