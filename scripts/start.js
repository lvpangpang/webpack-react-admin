const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.config.js')
const {
  getAdminConfig,
  getUnoccupiedPort,
  open,
  checkAdminVersion,
  checkPackageJsonVersion,
  createIndex,
  createMicroRoutes,
} = require('../utils')

async function start() {
  const { port, useFileRouter, checkAdmin, checkPackage, microApp } = getAdminConfig
  if (checkAdmin) {
    checkAdminVersion()
  }
  if (checkPackage) {
    checkPackageJsonVersion()
  }
  if (useFileRouter) {
    createIndex()
  }
  if (microApp) {
    createMicroRoutes()
  }
  const port1 = await getUnoccupiedPort(port)
  const options = Object.assign(webpackConfig.devServer, { port: port1 })
  const compiler = webpack(webpackConfig)
  const devServer = new webpackDevServer(options, compiler)
  let opened = false
  compiler.hooks.done.tap('done', async () => {
    if (!opened) {
      opened = true
      open(port1)
    }
  })
  devServer.start()
}

start()
