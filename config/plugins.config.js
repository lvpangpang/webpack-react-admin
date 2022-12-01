const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const createMicroRoutes = require('../utils/init/createMicroRoutes')
const HtmlResources = require('../plugins/html-resources')

const {
  getAdminConfig,
  getProcessArgv,
  __public,
  __publicIndexHtml,
  __dist,
  isProd,
} = require('../utils')

const { useEslint, microApp, useMicroApp } = getAdminConfig

const PluginsConfig = [
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(getProcessArgv()),
  }),
  new HtmlWebpackPlugin({
    template: __publicIndexHtml,
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
    ignoreOrder: true,
  }),
  new HtmlResources(),
]

// public文件夹静态资源复制
const files = glob.sync('**/*.*', {
  cwd: __public,
})
if (isProd() && files.length > 1) {
  PluginsConfig.push(
    new CopyPlugin({
      patterns: [
        {
          from: __public,
          to: __dist,
          globOptions: {
            ignore: ['**/*index.html'],
          },
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
      exposes: createMicroRoutes(),
    })
  )
}

// 获取远程资源提供者
if (useMicroApp) {
  const { name, publicPath } = useMicroApp
  PluginsConfig.push(
    new ModuleFederationPlugin({
      remotes: {
        // [name]: `${name}@${publicPath}/entry.js`,
        [name]: `promise new Promise(resolve => {
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
        })`,
      },
    })
  )
}

PluginsConfig.concat(getAdminConfig.plugins || [])

module.exports = PluginsConfig
