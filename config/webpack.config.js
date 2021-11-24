const ip = require('ip')
const isPro = process.argv[2] === 'build'
const splitchunksConfig = require('./splitchunks.config.js')
const parseConfig = require('./parse.config.js')
const pluginsConfig = require('./plugins.config.js')
const { getAdminConfig, __src, __dist, __public, resolvePath, __adminIndex } = require('../utils')

const { useFileRouter, entry, publicPath, micList } = getAdminConfig

module.exports = {
  // 模式
  mode: isPro ? 'production' : 'development',
  // 开发环境开启源代码查看功能
  devtool: isPro ? false : 'inline-source-map',
  // 入口
  entry: useFileRouter ? __adminIndex : resolvePath(entry || 'src/index.js'),
  // 出口
  output: {
    path: __dist,
    filename: 'js/main.[contenthash].js',
    chunkFilename: 'js/chunk.[contenthash].js',
    publicPath: publicPath ? publicPath : '/'
  },
  stats: 'errors-only',
  // 分包策略
  optimization: micList ? {} : splitchunksConfig,
  // 解析
  resolve: {
    alias: {
      '@': __src,
    },
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.css', '.less'],
  },
  // loaders
  module: parseConfig,
  // 插件
  plugins: pluginsConfig,
  // 开发服务器
  devServer: {
    historyApiFallback: true,
    host: ip.address(),
    hot: true,
    static: {
      directory: __public,
      publicPath: '/',
      watch: true,
    },
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}
