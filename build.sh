#!/bin/bash

pushd clientDev/
npm run build
popd
cp ./clientDev/public/index.html ./production/index.html
cp ./clientDev/public/styles.css ./production/public/styles.css
