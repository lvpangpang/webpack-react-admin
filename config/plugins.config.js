const path = require('path')
const webpack = require('webpack')
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const WebpackBar = require('webpackbar')
const { isProd } = require('../utils')

const {
  getAdminConfig,
  getProcessArgv,
  __public,
  __publicIndexHtml,
  __dist,
  resolvePath,
} = require('../utils')

const { useCopyPublic, useEslint, microApp, useMicroApp } = getAdminConfig
const PluginsConfig = [
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(getProcessArgv()),
  }),
  new WebpackBar(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: __publicIndexHtml,
  }),
  isProd ? new ReactRefreshPlugin() : () => {}, // 为 react-refresh 添加
]

if (useCopyPublic) {
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
if (useEslint) {
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

// 作为资源提供者
if (microApp) {
  const { name } = microApp
  PluginsConfig.push(
    new ModuleFederationPlugin({
      name,
      filename: 'entry.js',
      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
      exposes: {
        './List': resolvePath('src/List'),
      },
    })
  )
}

// 获取远程资源提供者
if (useMicroApp) {
  const { name, publicPath } = useMicroApp
  PluginsConfig.push(
    new ModuleFederationPlugin({
      remotes: {
        [name]: `${name}@${publicPath}/entry.js`,
        /* [name]: `promise new Promise(resolve => {
          const remoteUrl = '${publicPath}/entry.js?now='+Date.now()
          const script = document.createElement('script')
          script.src = remoteUrl
          script.onload = () => {
            const proxy = {
              get: (request) => window.${name}.get(request),
              init: (arg) => {
                try {
                  return window.${name}.init(arg)
                } catch(e) {
                  console.log(e)
                }
              }
            }
            resolve(proxy)
          }
          document.head.appendChild(script)
        })` */
      },
    })
  )
}

PluginsConfig.concat(getAdminConfig.plugins || [])

module.exports = PluginsConfig