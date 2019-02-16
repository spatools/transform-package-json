# transform-package-json [![NPM version](https://badge.fury.io/js/transform-package-json.png)](http://badge.fury.io/js/transform-package-json)

Utility script to transform package.json - Remove scripts, devDependencies and change properties.

## Installation

Install this script as a dev dependency.

```bash
$ npm install transform-package-json --save-dev
```

## Usage

### CLI

Add your build script to your `package.json` `scripts`:

```json
{
    "scripts": {
        "build-packagejson": "transform-package-json --remove scripts --remove devDependencies --version 1.0.0 package.json dist/"
    }
}
```

Then run your script:

```bash
$ npm run build-packagejson
```

### Programmatically

```javascript
var pkgTransform = require("transform-package-json");
pkgTransform.transform("package.json", "dist/", {
    remove: ["scripts", "devDependencies"],
    version: "1.0.0"
});
```

## Exemple

Using the configuration above, consider the following example `package.json` to see it in action:

```json
{
  "name": "pkg-name",
  "version": "0.0.1",
  "description": "Package Description",
  "author": "SPA Tools",
  "license": "MIT",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/spatools/pkg-name.git"
  },
  "bugs": {
    "url": "https://github.com/spatools/pkg-name/issues"
  },
  "keywords": [
    "spatools"
  ],
  "scripts": {
    "build": "npm run lint && npm run build-ts && npm run build-assets",
    "build-ts": "tsc -p . --outDir dist",
    "build-assets": "cpx \"{package.json,LICENSE,README.md}\" dist",
    "lint": "tslint -c tslint.json -p tsconfig.json",
    "release": "npm run build && cd dist && npm publish"
  },
  "dependencies": {
    "glob": "^7.1.3",
    "nopt": "^4.0.1"
  },
  "devDependencies": {
    "@types/glob": "^7.1.1",
    "@types/nopt": "^3.0.29",
    "cpx": "^1.5.0",
    "tslint": "^5.12.1",
    "typescript": "^3.3.3"
  }
}
```

After running the grunt task it will be stored on the samples folder as

```json
{
  "name": "pkg-name",
  "version": "1.0.0",
  "description": "Package Description",
  "author": "SPA Tools",
  "license": "MIT",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/spatools/pkg-name.git"
  },
  "bugs": {
    "url": "https://github.com/spatools/pkg-name/issues"
  },
  "keywords": [
    "spatools"
  ],
  "dependencies": {
    "glob": "^7.1.3",
    "nopt": "^4.0.1"
  }
}
```

## Options

*Every option is optional.*

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `remove` | `Array` | `["scripts", "devDependencies"]` | Removes specified properties from source package.json |
| `replace` | `boolean` | `false` | Transform package.json in-place |
| `basePath` | `string` | `null` | Keep folder structre starting from `basePath`. Sets to `""` to keep entire folder structure. |
| `{prop}` | `any` |  | Set the `property` of the package with given value. (eg: `version: "1.0.0"` sets the package version to `1.0.0`) |


## Release History

* 1.0.0 Initial Release
