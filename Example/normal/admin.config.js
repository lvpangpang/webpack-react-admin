module.exports = {
  title: '吕肥肥',
  externals: {
    react: {
      name: 'React',
      url: 'https://unpkg.com/react@17.0.0/umd/react.production.min.js',
    },
  },
  isRem: true,
  babelPlugins:[['import', { libraryName: 'antd', style: 'css' }, 'antd']]
}
