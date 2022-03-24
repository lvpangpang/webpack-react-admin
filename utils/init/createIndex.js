const fs = require('fs-extra')
const {createRoutes} = require('./createRoutes')
const watchFile = require('./watchFile')
const getAdminConfig = require('../getAdminConfig')
const { __adminIndex, __pages } = require('../paths')
const isProd = process.argv[2] === 'build'

function createIndex() {
  const routesMap = createRoutes()
  let importHtml = `import React, { Suspense } from 'react'; import { BrowserRouter, Switch, Route } from 'react-router-dom';import ReactDOM from 'react-dom';`
  let html =
    'function App() { return (<BrowserRouter><Suspense fallback={<div>Loading...</div>}><Switch>'
  routesMap.forEach((item) => {
    html += `<Route exact path="${item.url}" component={${item.component}} />`
  })
  html += '</Switch></Suspense></BrowserRouter>)}'

  html += `ReactDOM.render(<App />, document.querySelector('#root'))`
  const resultHtml = importHtml + html
  fs.outputFileSync(__adminIndex, resultHtml)
}

if (getAdminConfig.useFileRouter && !isProd) {
  watchFile(__pages, () => {
    createIndex()
  })
}
module.exports = createIndex
