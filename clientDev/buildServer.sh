#!/bin/bash

#npm run build-server

serverPath="./serverDev/server"
clientPath="./clientDev/public"

pushd ../
if [ ! -d $serverPath/public ]; then
    mkdir $serverPath/public
fi

if [ ! -f $serverPath/index.html ]; then
    cp -p $clientPath/index.html $serverPath/
    echo `Created $serverPath/index.html`
elif [ $clientPath/index.html -nt $serverPath/index.html ]; then
    cp -p $clientPath/index.html $serverPath/
    echo "Found clientDev index.html is Newer. Replaced in production"
fi
    
if [ ! -f $serverPath/public/styles.css ]; then
    cp -p $clientPath/public/styles.css $serverPath//public
    echo "Created $serverPath/styles.css"    
elif [ $clientPath/public/styles.css -nt $serverPath/public/styles.css ]; then
    cp -p $clientPath/public/styles.css $serverPath/public
    echo "Found clientDev styles.css is Newer. Replaced in production"    
fi

if [ ! -f $serverPath/public/main.js ]; then
    cp -p $clientPath/public/main.js $serverPath//public
    echo "Created $serverPath/main.js"    
elif [ $clientPath/public/main.js -nt $serverPath/public/main.js ]; then
    cp -p $clientPath/public/main.js $serverPath/public
    echo "Found clientDev main.js is Newer. Replaced in production"    
fi

popd
