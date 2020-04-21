#!/bin/bash

echo "build environment：$1";
echo "commit ：$2";

testCommitMsg="build file into dist directory for test"
onlineCommitMsg="build file into dist directory for online"

if [[ $1 == "dev" ]]; then
    echo "git autopush start..."
    git add .
    git commit -m $2
    # git checkout dev
    git push origin dev
    echo "git autopush end..."
elif [[ $1 == "online" ]]
then
    npm run build
    echo "git autopush start..."
    git add .
    git commit -m $2
    # git checkout master
    git push origin master
    echo "git autopush end..."
else
    echo "environment is invalid"
fi

echo "end build ==============="
