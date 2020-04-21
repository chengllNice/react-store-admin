#!/bin/bash

echo "build environment：$1";
echo "commit ：$2";

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
elif [ $1 == "master" ]; then
  if [ $br == 'dev' ]; then
    echo "\033[41;36m pleace checkout branch to master \033[0m"
  elif [ $br == 'master' ]; then
    npm run build
    echo "git autopush start..."
    git add .
    git commit -m $2
    git push origin master
    echo "git autopush end..."
    echo "git autopush start chengllNice.github.io..."
    npm run auto:push
    echo "git autopush end chengllNice.github.io..."
  fi
elif [ $1 == "push" ]; then
  echo "git autopush start..."
  git add .
  git commit -m $2
  git push origin $br
  echo "git autopush end..."
else
  echo "\033[41;36m environment is invalid \033[0m"
fi

echo "end react-store-admin build ==============="
