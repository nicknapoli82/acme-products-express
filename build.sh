#!/bin/bash

pushd clientDev/
npm run build
popd
if [ ! -d ./production/ ]; then
    mkdir production
    mkdir production/public
fi

if [ ! -f ./production/index.html ]; then
    cp -p ./clientDev/public/index.html ./production/
    echo "Created ./production/index.html"
elif [ ./clientDev/public/index.html -nt ./production/index.html ]; then
    cp -p ./clientDev/public/index.html ./production/
    echo "Found clientDev index.html is Newer. Replaced in production"
fi
    
if [ ! -f ./production/public/styles.css ]; then
    cp -p ./clientDev/public/public/styles.css ./production/public/
    echo "Created ./production/public/styles.css"    
elif [ ./clientDev/public/public/styles.css -nt ./production/public/styles.css ]; then
    cp -p ./clientDev/public/public/styles.css ./production/public/
    echo "Found clientDev styles.css is Newer. Replaced in production"    
fi

if [ ! -f ./production/server.js ]; then
    cp -p ./serverDev/server/server.js ./production/server.js
    echo "Created ./serverDev/server/server.js"    
elif [ ./serverDev/server/server.js -nt ./production/server.js ]; then
    cp -p ./serverDev/server/server.js ./production/server.js
    echo "Found clientDev styles.css is Newer. Replaced in production"    
fi

if [ ! -f ./production/products.json ]; then
    cp -p ./serverDev/server/products.json ./production/products.json
    echo "Created ./serverDev/server/products.json"    
elif [ ./serverDev/server/products.json -nt ./production/products.json ]; then
    cp -p ./serverDev/server/products.json ./production/products.json
    echo "Found clientDev styles.css is Newer. Replaced in production"    
fi
