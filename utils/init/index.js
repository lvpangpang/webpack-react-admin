const fs = require('fs-extra')
const { join } = require('path')
const getAdminConfig = require('../getAdminConfig')
const createRoot = require('./createRoot')
const createRoutes = require('./createRoutes')
const createLayout = require('./createLayout')
const createMicroList = require('./createMicroList')
const { useFileRouter, useMicroApp } = getAdminConfig
const { __admin } = require('../paths')

function init() {
  if (useFileRouter || useMicroApp) {
    fs.copySync(join(__dirname, './entry'), __admin)
    createRoot()
    createLayout()
    createRoutes()
    if (useMicroApp) {
      createMicroList()
    }
  }
}

module.exports = init
