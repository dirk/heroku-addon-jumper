BROWSERIFY_OPTS=-t [ babelify --presets [ es2017 ] ]

all: dist/options.js dist/popup.js

dist/options.js: src/options.js
dist/popup.js: src/popup.js

clean:
	rm -f dist/*.js

%.js:
	node_modules/.bin/browserify $< -o $@ $(BROWSERIFY_OPTS)
