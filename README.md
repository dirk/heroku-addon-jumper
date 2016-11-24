# Heroku Add-on Jumper

Quickly open Heroku add-ons via their single-sign-on URLs.

## Getting started

Browserify is used for building the target JavaScript and using the [Heroku Platform Node.js API](https://github.com/heroku/node-heroku-client).

```sh
git clone https://github.com/dirk/heroku-addon-jumper.git
cd heroku-addon-jumper

# Install all the dependencies
yarn install

# Build the target JavaScript
make
```

Then add this extension to Chrome; see [their guide][] for more details.

[their guide]: https://developer.chrome.com/extensions/getstarted
