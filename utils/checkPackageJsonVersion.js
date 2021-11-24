const { join } = require('path')
const fs = require('fs-extra')
const semverGt = require('semver/functions/gt')
const chalk = require('chalk')
const { __packageJson, __nodeModules } = require('./paths')
const { warning, error, info } = require('./info')

// 检测package.json依赖包的版本号和本地已安装的版本是否一致
function checkPackageJsonVersion() {
  info('正在检测package.json依赖包的版本号和本地已安装的版本是否一致...')
  console.log('')
  const { dependencies, devDependencies } = require(__packageJson)
  const allDeps = {
    ...devDependencies,
    ...dependencies,
  }
  const newPackages = Object.keys(allDeps)
    .filter((item) => {
      const npmPackagePath = join(__nodeModules, item, 'package.json')
      if (fs.pathExistsSync(npmPackagePath)) {
        const npmPackage = require(npmPackagePath)
        const curVersion = allDeps[item].replace(/[\^\~]/g, '')
        return semverGt(curVersion, npmPackage.version)
      }
      return true
    })
    .map((item) => {
      return {
        name: item,
        version: allDeps[item],
      }
    })

  if (newPackages.length) {
    warning('检测到 package.json 中有以下依赖项有变更\n')
    newPackages.forEach((item) => {
      console.log(chalk.yellow(`依赖: ${item.name}  版本: ${item.version}`))
    })
    console.log('')
    error('请先安装后再启动')
    return
  }
}

module.exports = checkPackageJsonVersion
