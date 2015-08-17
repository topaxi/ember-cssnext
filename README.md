# ember-cssnext

Use [cssnext](http://cssnext.io/) to preprocess your [ember-cli](http://www.ember-cli.com/) app's css.

## Installation

```sh
ember install ember-cssnext
```

## Usage

By default, this addon will compile `app/styles/app.css` into `dist/assets/app.css`.
Additional options can be specified using the `cssnextOptions` config property in `ember-cli-build.js`:

```javascript
var app = new EmberApp({
  cssnextOptions: {...}
})
```

## Configuring Input/Output Paths

You can configure the input and output files using ember-cli's `outputPaths` option in `ember-cli-build.js`:
```javascript
var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'app': '/assets/my-project.css'
      }
    }
  }
});
```

You can also configure multiple input/output paths to generate multiple css files:

```javascript
var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'theme-orange': '/assets/theme-orange.css',
        'theme-purple': '/assets/theme-purple.css'
      }
    }
  }
});
```

## Usage in Addons

You can also use this to precompile cssnext files in an addon. By default, this
will compile `addon/styles/addon.css` into css that will be merged into the
host app's css. *(requires ember-cli >= 0.2.0)*:

1. Install `ember-cssnext` in your addon's `package.json` under `dependencies`
2. Create your addon less file at `addon/styles/addon.css` (or where you specify in your options)
3. To run the addon's dummy app, be sure to create `tests/dummy/app/styles/app.css` if it doesn't exist

## References

- Code largely based on: [ember-cli-less](https://github.com/gdub22/ember-cli-less). Credits to the author.
- [broccoli-cssnext-single](https://github.com/topaxi/broccoli-cssnext-single)
- [cssnext](http://cssnext.io/)
