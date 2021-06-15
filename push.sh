#! /bin/sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m 'regular update'
git pull
git push