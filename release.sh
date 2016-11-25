#!/bin/bash

set -ex

rm dist/*.min.js || true;

for file in dist/*.js; do
  file_minified=${file/.js/.min.js}

  node_modules/.bin/uglifyjs $file --output $file_minified --compress dead_code,unused --mangle
done

DEST=build
rm -rf $DEST
mkdir -p $DEST

cp -R src        $DEST/
cp -R dist       $DEST/
cp *.html        $DEST/
cp manifest.json $DEST/
cp LICENSE       $DEST/

for file in $DEST/dist/*.min.js; do
  mv $file ${file/.min.js/.js}
done
