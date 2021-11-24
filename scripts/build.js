const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.js')
const { success, error, warning, info, createIndex, getAdminConfig, beautifyBuild } = require('../utils')

const { useFileRouter } = getAdminConfig
if (useFileRouter) {
  createIndex()
}
const compiler = webpack(webpackConfig)
info('正在打包构建......')
compiler.run((err, stats) => {
  compiler.close((err2) => {
    err2 && error(String(err2))
  })
  if (err) {
    error(String(err))
  } else {
    const { errors = [], warnings = [] } = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    })
    if (warnings.length) {
      warning(warnings.map((item) => item.message).join('\n\n'))
    }
    if (errors.length) {
      error(errors.map((item) => item.message).join('\n\n'))
    }
    success('构建成功')
    beautifyBuild(stats)
  }
})
