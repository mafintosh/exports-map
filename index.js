module.exports = function exportMap (m, runtimes, req) {
  if (!req) req = '.'
  if (!m) return req

  if (typeof m === 'string') m = [m]

  // Cant really find any docs on this, so just assuming this is how it works based on tests?
  if (Array.isArray(m)) {
    for (const v of m) {
      if (req === v || req === '.') return v
    }
    return null
  }

  // If it's directly there, use that one
  if (has(m, req)) return condExports(m[req], runtimes)

  // Check for globs
  const ks = Object.keys(m)

  for (let i = 0; i < ks.length; i++) {
    const k = ks[i]

    if (!k.endsWith('*')) continue
    if (!req.startsWith(k.slice(0, -1))) continue

    const v = condExports(m[k], runtimes)
    if (v === null) break

    return v.replace('*', req.slice(k.length - 1))
  }

  return null
}

function condExports (val, runtimes) {
  if (typeof val === 'string') return val
  if (val === null || typeof val !== 'object') return val

  const ks = Object.keys(val)

  for (let i = 0; i < ks.length; i++) {
    const k = ks[i]
    if (runtimes.has(k)) return firstEntry(val[k])
  }

  return null
}

function firstEntry (arr) {
  return Array.isArray(arr) ? (arr.length ? arr[0] : null) : arr
}

function has (m, k) {
  return Object.prototype.hasOwnProperty.call(m, k)
}
