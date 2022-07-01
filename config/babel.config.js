const { getAdminConfig, isProd } = require('../utils')

const babelConfig = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    require('../plugins/auto-css-modules'),
    !isProd() ? [require.resolve('react-refresh/babel')] : {},
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['import', { libraryName: 'antd', style: 'css' }, 'antd'],
    ['import', { libraryName: 'antd-mobile', style: 'css' }, 'antd-mobile'],
  ].concat(getAdminConfig.babelPlugins || []),
}

module.exports = babelConfig
