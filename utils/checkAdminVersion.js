const shell = require('shelljs')
const { __packageJson } = require('./paths')
const { info, error } = require('./info')

function getModuleVersion(name) {
  const { stdout } = shell.exec(`npm view ${name} version`, {
    silent: true,
  })
  return stdout.replace(/\s|[\r\n]/g, '')
}
// 判断脚手架的版本是否是最新的
function checkAdminVersion() {
  const adminName = 'webpack-react-admin'
  const { dependencies, devDependencies } = require(__packageJson)
  const allDeps = {
    ...devDependencies,
    ...dependencies,
  }
  const packAdminVersion = (allDeps[adminName] || '').replace(/[\^\~]/g, '')
  const lastAdminVersion = getModuleVersion(adminName)
  info('正在检测脚手架是否为最新版本...')
  if (packAdminVersion !== lastAdminVersion) {
    error(`请手动安装最新版本的脚手架再启动项目\n  最新的版本号为V ${lastAdminVersion}`)
    return
  }
}

module.exports = checkAdminVersion
