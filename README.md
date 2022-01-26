# node-export-map

Userland module that implements the module path mapping that Node.js does with "exports" in package.json

```
npm install node-export-map
```

## Usage

``` js
const nem = require('node-export-map')

// Specify the runtimes you support
const runtimes = new Set(['import'])

// Get an export map somewhere, this one is from preact
const exportMap = {
  ".": {
    "browser": "./dist/preact.module.js",
    "umd": "./dist/preact.umd.js",
    "import": "./dist/preact.mjs",
    "require": "./dist/preact.js"
  },
  "./compat": {
    "browser": "./compat/dist/compat.module.js",
    "umd": "./compat/dist/compat.umd.js",
    "require": "./compat/dist/compat.js",
    "import": "./compat/dist/compat.mjs"
  }
}

// And map a path

const main = nem(exportMap, runtimes, '.')
console.log(main) // prints ./dist/preact.mjs

const compact = nem(exportMap, runtimes, './compat')
console.log(compact) // prints ./compat/dist/compat.mjs

const unknown = nem(exportMap, runtimes, './foobarbaz')
console.log(unknown) // is null
```

## License

MIT
