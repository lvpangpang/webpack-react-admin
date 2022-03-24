const { resolve } = require('path')
const resolvePath = (path) => resolve(process.cwd(), path)

module.exports = {
  resolvePath,
  __packageJson: resolvePath('package.json'),
  __nodeModules: resolvePath('node_modules'),
  __adminConfig: resolvePath('admin.config.js'),
  __root: process.cwd(),
  __public: resolvePath('public'),
  __publicIndexHtml: resolvePath('public/index.html'),
  __dist: resolvePath('dist'),
  __src: resolvePath('src'),
  __pages: resolvePath('src/pages'),
  __index: resolvePath('src/index.js'),
  __admin: resolvePath('.admin'),
  __adminIndex: resolvePath('.admin/index.js'),
  ___microRoutes: resolvePath('.admin/microRoutes.js'),
}
