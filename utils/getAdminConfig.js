const fs = require('fs')
const { __adminConfig } = require('./paths')

function getAdminConfig() {
  if (fs.existsSync(__adminConfig)) {
    return Object.assign({}, require(__adminConfig))
  } else {
    return {}
  }
}

module.exports = getAdminConfig()
