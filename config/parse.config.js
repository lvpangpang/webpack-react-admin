const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { __src, __admin } = require('../utils')
const babelConfig = require('./babel.config.js')
const postCssConfig = require('./postCss.config.js')
const { getAdminConfig } = require('../utils')
const { isRem } = getAdminConfig

const remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75,
    remPrecision: 8,
  },
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('autoprefixer')(postCssConfig)],
    },
  },
}

const cssModulesLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: false,
    // 开启 CSS Modules
    modules: {
      mode: 'local',
      localIdentName: '[name]__[local]--[hash:base64:8]',
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
          ...babelConfig,
        },
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      oneOf: [
        {
          resourceQuery: /css_modules/,
          use: [miniCssExtractPlugin.loader, cssModulesLoader, postCssLoader].concat(
            isRem ? [remLoader] : []
          ),
        },
        {
          use: [miniCssExtractPlugin.loader, 'css-loader', postCssLoader].concat(
            isRem ? [remLoader] : []
          ),
        },
      ],
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      oneOf: [
        {
          resourceQuery: /css_modules/,
          use: [miniCssExtractPlugin.loader, cssModulesLoader, postCssLoader]
            .concat(isRem ? [remLoader] : [])
            .concat(['less-loader']),
        },
        {
          use: [miniCssExtractPlugin.loader, 'css-loader', postCssLoader]
            .concat(isRem ? [remLoader] : [])
            .concat(['less-loader']),
        },
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [miniCssExtractPlugin.loader, 'css-loader', postCssLoader],
    },
    {
      test: /\.less$/,
      include: /node_modules/,
      use: [miniCssExtractPlugin.loader, 'css-loader', postCssLoader, 'less-loader'],
    },
    {
      test: /\.(png|jpg|svg|gif|otf)$/,
      type: 'asset',
    },
  ],
}

module.exports = parseConfig
