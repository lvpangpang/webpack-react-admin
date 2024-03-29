const splitchunksConfig = require('./splitchunks.config.js')
const parseConfig = require('./parse.config.js')
const pluginsConfig = require('./plugins.config.js')
const bmsLibExternals = require('../config/externals.js')
const { getAdminConfig, __src, __dist, __public, resolvePath, isProd, __root } = require('../utils')
const {
  useFileRouter,
  entry,
  publicPath,
  microApp,
  useMicroApp,
  externals,
  bmsLib,
  proxy,
} = getAdminConfig

// Externals配置
const resultExternals = {}
let tempExternals = {}
if (bmsLib) {
  tempExternals = {
    ...bmsLibExternals,
  }
}
if (externals) {
  tempExternals = {
    ...tempExternals,
    ...externals
  }
}
Object.keys(tempExternals).forEach((item) => {
  resultExternals[item] = tempExternals[item]['name']
})

// 不同模式走不同的入口
let _entry = resolvePath(entry || 'src/index.js')
if (useFileRouter || microApp) {
  _entry = resolvePath('.admin/fileRouter/index.js')
}
if (useMicroApp) {
  _entry = resolvePath('.admin/micro/index.js')
}

module.exports = {
  cache: true,
  // 模式
  mode: isProd() ? 'production' : 'development',
  // 开发环境开启源代码查看功能
  devtool: isProd() ? false : 'inline-source-map',
  // 入口
  entry: _entry,
  // 出口
  output: {
    path: __dist,
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    hashDigestLength: 10,
    publicPath: isProd() ? publicPath || '/' : '/',
    clean: true,
  },
  stats: 'errors-warnings',
  // 分包策略
  optimization: microApp ? {} : splitchunksConfig,
  // 剔除常用库，走CDN
  externals: isProd() ? resultExternals : {},
  // 解析
  resolve: {
    alias: {
      '@': __src,
      '@@': __root,
    },
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.css', '.less'],
  },
  performance: {
    hints: false,
  },
  // loaders
  module: parseConfig,
  // 插件
  plugins: pluginsConfig,
  // 开发服务器
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: {
      directory: __public,
      publicPath: '/',
      watch: true,
    },
    proxy: proxy || {},
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}
