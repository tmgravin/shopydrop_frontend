#!/bin/bash

# Ensure Node.js and npm are installed
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null
then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install 18
    nvm use 18
    nvm alias default 18
fi

# Log node and npm versions
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# Navigate to the correct directory
cd /home/ec2-user/next

# Install dependencies
npm install
npm run build
