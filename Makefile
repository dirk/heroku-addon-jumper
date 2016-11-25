BROWSERIFY_OPTS=--transform [ babelify --presets [ es2017 es2015 react ] --global ]

all: dist/options.js dist/popup.js

dist/options.js: src/options.js
dist/popup.js: src/popup.jsx

clean:
	rm -f dist/*.js

%.js:
	node_modules/.bin/browserify node_modules/babel-polyfill $< -o $@ $(BROWSERIFY_OPTS)
