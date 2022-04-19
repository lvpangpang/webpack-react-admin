const { resolve } = require('path')
const resolvePath = (path) => resolve(process.cwd(), path)

// 指定路径地址集合
module.exports = {
  resolvePath,
  __root: process.cwd(),
  __packageJson: resolvePath('package.json'),
  __nodeModules: resolvePath('node_modules'),
  __adminConfig: resolvePath('admin.config.js'),
  __public: resolvePath('public'),
  __publicIndexHtml: resolvePath('public/index.html'),
  __dist: resolvePath('dist'),
  __src: resolvePath('src'),
  __pages: resolvePath('src/pages'),
  __layout: resolvePath('src/layout'),
  __index: resolvePath('src/index.js'),
  __admin: resolvePath('.admin'),
  __adminIndex: resolvePath('.admin/index.js'),
  __adminRoutes: resolvePath('.admin/routes.js'),
  __microRoutes: resolvePath('.admin/microRoutes.js'),
  __microList: resolvePath('.admin/microList.js'),
}
