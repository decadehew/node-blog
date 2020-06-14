#!/bin/sh
cd /Users/decadehew/Desktop/webapp/2020/node/node-blog/blog-logger/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log