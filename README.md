# exports-map

Userland module that implements the module path mapping that Node.js does with "exports" in package.json

```
npm install exports-map
```

## Usage

``` js
const em = require('exports-map')

// Specify the runtimes you support
const runtimes = new Set(['import'])

// Get an export map somewhere, this one is from preact
const exportsMap = {
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

const main = em(exportsMap, runtimes, '.')
console.log(main) // prints ./dist/preact.mjs

const compact = em(exportsMap, runtimes, './compat')
console.log(compact) // prints ./compat/dist/compat.mjs

const unknown = em(exportsMap, runtimes, './foobarbaz')
console.log(unknown) // is null
```

## License

MIT
