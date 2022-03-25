const fs = require('fs-extra')
const { join } = require('path')
const getAdminConfig = require('../getAdminConfig')
const createRoot = require('./createRoot')
const createRoutes = require('./createRoutes')
const createLayout = require('./createLayout')
const { useFileRouter } = getAdminConfig
const { __admin } = require('../paths')

function init() {
  if (useFileRouter) {
    fs.copySync(join(__dirname, './entry'), __admin)
    createRoutes()
    createRoot()
    createLayout()
  }
}

module.exports = init
