const path = require('path')
const webpack = require('webpack')
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const WebpackBar = require('webpackbar')

const {
  getAdminConfig,
  getProcessArgv,
  __public,
  __publicIndexHtml,
  __dist,
  resolvePath,
} = require('../utils')

const PluginsConfig = [
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(getProcessArgv()),
  }),
  new WebpackBar(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: __publicIndexHtml,
  }),
  new ReactRefreshPlugin(), // 为 react-refresh 添加
]

if (getAdminConfig.useCopyPublic) {
  PluginsConfig.push(
    new CopyPlugin({
      patterns: [
        {
          from: __public,
          globOptions: {
            ignore: ['**/*index.html'],
          },
          to: __dist,
        },
      ],
    })
  )
}

// 是否启动eslint
if (getAdminConfig.useEslint) {
  PluginsConfig.push(
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter'),
      overrideConfigFile: path.join(__dirname, './eslint.config.js'),
      fix: false,
      useEslintrc: false,
      extensions: ['js', 'jsx', 'tsx'],
    })
  )
}

/* // 作为资源提供者
const micList = getAdminConfig.micList
if (micList) {
  PluginsConfig.push(
    new ModuleFederationPlugin({
      // 提供给其他服务加载的文件
      filename: 'entry.js',
      // 唯一ID，用于标记当前服务
      name: 'app1',
      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
      exposes: {
        './List': resolvePath('src/List'),
      },
    })
  )
}

// 获取远程资源提供者
const useMicList = getAdminConfig.useMicList
if (useMicList) {
  PluginsConfig.push(
    new ModuleFederationPlugin({
      name: 'app2',
      // 引用 app1 的服务
      remotes: {
        app1: 'app1@http://26.26.26.1:3000/entry.js',
      },
    })
  )
}
 */
PluginsConfig.concat(getAdminConfig.plugins || [])

module.exports = PluginsConfig
