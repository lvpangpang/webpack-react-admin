const fs = require('fs-extra')
const { join } = require('path')
const { __index, __admin } = require('../paths')
const watchFiles = require('./watchFile')

let lastContent = ``
let hasWatched = false

function watchRoot() {
  if (!hasWatched) {
    hasWatched = true
    watchFiles(__index, () => {
      createRoot()
    })
  }
}
function createRoot() {
  watchRoot()
  const content = fs.pathExistsSync(__index)
    ? `
import Root from '@'

export default Root
`
    : `
import { BrowserRouter } from 'react-router-dom'

export default function({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>
}
`
  if (content !== lastContent) {
    lastContent = content
    fs.outputFileSync(join(__admin, 'root.js'), content)
  }
}

module.exports = createRoot
