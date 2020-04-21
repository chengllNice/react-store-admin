#!/bin/bash

echo "build environment：$1";
echo "commit ：$2";

onlineDevCommit="commit dev and checkout master"
devMasterCommit="commit master and checkout dev"

branch=`git branch | grep "*"` # 获取分支名
br=${branch:2} # 去除多余的*
echo "branch $br"


if [ $1 == "dev" ]; then
  if [ $br == 'master' ]; then
    echo "\033[41;36m pleace checkout branch to dev \033[0m"
  elif [ $br == 'dev' ]; then
    echo "git autopush start..."
    git add .
    git commit -m $2
    git push origin dev
    echo "git autopush end..."
  fi
elif [ $1 == "online" ]
then
  if [ $br == 'dev' ]; then
    git add .
    git commit -m ${onlineDevCommit}
    git checkout master
    git merge dev
    echo "git auto checkout master and merge dev..."
  fi
  npm run build
  echo "git autopush start..."
  git add .
  git commit -m $2
  # git checkout master
  git push origin master
  echo "git autopush end..."
  echo "git autopush start chengllNice.github.io..."
  npm run auto:push
  echo "git autopush end chengllNice.github.io..."
else
    echo "environment is invalid"
fi

echo "end react-store-admin build ==============="
