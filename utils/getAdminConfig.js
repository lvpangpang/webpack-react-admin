const fs = require('fs')
const defaultConfig = require('../config/admin.config.js')
const { __adminConfig } = require('./paths')

function getAdminConfig() {
  if (fs.existsSync(__adminConfig)) {
    return Object.assign({}, defaultConfig, require(__adminConfig))
  } else {
    return defaultConfig
  }
}

module.exports = getAdminConfig()
