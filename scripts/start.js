const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.config.js')
const init = require('../utils/init')
const {
  getAdminConfig,
  getUnoccupiedPort,
  checkAdminVersion,
  checkPackageJsonVersion,
} = require('../utils')

async function start() {
  const { port, checkAdmin = true, checkPackage } = getAdminConfig
  if (checkAdmin) {
    checkAdminVersion()
  }
  if (checkPackage) {
    checkPackageJsonVersion()
  }
  init()
  const unoccupiedPort = await getUnoccupiedPort(port)
  const options = Object.assign(webpackConfig.devServer, { port: unoccupiedPort, host: 'local-ip' })
  const compiler = webpack(webpackConfig)
  const devServer = new webpackDevServer(options, compiler)
  devServer.start()
}

start()
