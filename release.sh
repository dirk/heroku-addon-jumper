#!/bin/bash

set -ex

rm dist/*.min.js || true;

for file in dist/*.js; do
  file_minified=${file/.js/.min.js}

  node_modules/.bin/uglifyjs $file --output $file_minified --compress dead_code,unused --mangle

  # closure="java -jar node_modules/google-closure-compiler/compiler.jar"
  #
  # $closure --js $file            --js_output_file $file_minified.1 --compilation_level WHITESPACE_ONLY
  # $closure --js $file_minified.1 --js_output_file $file_minified.2 --compilation_level ADVANCED_OPTIMIZATIONS
  #
  # mv $file_minified.2 $file_minified
done
