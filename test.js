const test = require('brittle')
const em = require('./')

test('one', function (t) {
  const m = './index.js'
  const r = new Set()

  t.is(em(m, r, '.'), './index.js')
  t.is(em(m, r, './index.js'), './index.js')
  t.is(em(m, r, './foo'), null)
})

test('array', function (t) {
  const m = ['./index.js', './package.json']
  const r = new Set()

  t.is(em(m, r, '.'), './index.js')
  t.is(em(m, r, './index.js'), './index.js')
  t.is(em(m, r, './package.json'), './package.json')
  t.is(em(m, r, './other.js'), null)
})

test('conditionals', function (t) {
  const m = {
    '.': {
      require: './require.js',
      import: './import.js',
      node: './node.js'
    },
    './api/*': './api/*.js'
  }

  const r = new Set(['node'])

  t.is(em(m, r, '.'), './node.js')
  t.is(em(m, r, './api/foo'), './api/foo.js')
  t.is(em(m, r, './foo'), null)

  r.add('require')
  t.is(em(m, r, '.'), './require.js')

  r.add('import')
  t.is(em(m, r, '.'), './require.js')

  r.delete('require')
  t.is(em(m, r, '.'), './import.js')

  r.delete('import')
  t.is(em(m, r, '.'), './node.js')

  r.delete('node')
  t.is(em(m, r, '.'), null)
})
