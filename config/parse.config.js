const { getAdminConfig, __src, __admin } = require('../utils')
const babelConfig = require('./babel.config.js')
const postCssConfig = require('./postCss.config.js')

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('autoprefixer')(postCssConfig)],
    },
  },
}

const parseConfig = {
  rules: [
    {
      test: /\.(ts|tsx|js|jsx)$/,
      include: [__src, __admin],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          // sourceType: 'unambiguous',
          ...babelConfig,
        },
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', postCssLoader],
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: getAdminConfig.isCssModule
            ? {
                sourceMap: false,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:8]',
                },
              }
            : {},
        },
        postCssLoader,
        'less-loader',
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.(png|jpg|svg|gif|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            options: {
              limit: 1024,
            },
            outputPath: 'file/',
          },
        },
      ],
    },
  ],
}

module.exports = parseConfig
