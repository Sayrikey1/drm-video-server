#!/bin/sh

cd ..

rm -rf dist/

yarn build

zip -r "mpcsj_backend_abs.zip" .