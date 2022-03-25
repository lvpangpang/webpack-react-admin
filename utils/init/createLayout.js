const fs = require('fs-extra')
const { join } = require('path')
const { __layout, __admin } = require('../paths')
const watchFiles = require('./watchFile')

let lastContent = ``
let hasWatched = false

function watchRoot() {
  if (!hasWatched) {
    hasWatched = true
    watchFiles(__layout, () => {
      createRoot()
    })
  }
}
function createRoot() {
  watchRoot()
  const content = fs.pathExistsSync(__layout)
    ? `
import Layout from '@/layout'

export default Layout
`
    : `
export default ({ children }) => children
`
  if (content !== lastContent) {
    lastContent = content
    fs.outputFileSync(join(__admin, 'layout.js'), content)
  }
}

module.exports = createRoot
