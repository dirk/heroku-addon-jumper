# Heroku Add-on Jumper

Quickly open [Heroku][] add-ons via their single-sign-on URLs.

**Note**: This is an _unofficial_ piece of software and is not in any way officially associated with Heroku. Use of this software is at your own risk, and you're encouraged to read the source yourself before use.

[Heroku]: https://www.heroku.com/

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

## License

Released under the MIT license, see [LICENSE](LICENSE) for details.
