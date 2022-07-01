const { extname } = require('path')
const suffix = ['.css', '.less']

/**
 * babel的插件
 */
module.exports = () => {
  return {
    visitor: {
      // 定义了处理import语句的具体操作
      // specifiers表示import导入的变量组成的节点数组,长度大于0说明是import styles from './index.less'这种格式
      // source表示导出模块的来源节点
      ImportDeclaration(path) {
        const { specifiers, source } = path.node
        const { value } = source
        if (specifiers.length > 0 && suffix.includes(extname(value))) {
          // 在路径末尾加上 css_modules 用于 webpack 匹配该文件
          source.value = `${value}?css_modules`
        }
      },
    },
  }
}
