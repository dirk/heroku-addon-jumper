BROWSERIFY_OPTS=-t [ babelify --presets [ es2017 ] ]

%.js:
	node_modules/.bin/browserify $< -o $@ $(BROWSERIFY_OPTS)

dist/options.js: src/options.js
dist/popup.js: src/popup.js

clean:
	rm -f popup.js
