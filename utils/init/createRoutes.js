const glob = require('glob')
const { __pages } = require('../paths')

function replaceIndex(str) {
  return str && str.replace(/(\/index)?\.[jt]sx?/g, '')
}

// 动态路由必须是[id].js这种命名格式的文件
function dynamicMatch(url) {
  if (url.indexOf('[') !== -1) {
    return url.replace(/\[/g, ':').replace(/\]/g, '')
  }
  return url
}

function createRoutes() {
  const files = glob.sync('**/*.*(js|jsx|tsx|ts)', {
    cwd: __pages,
  })
  const routesMap = []
  files.forEach((item) => {
    let url = replaceIndex(item)
    url = `/${url === 'index' ? '' : url}`
    url = dynamicMatch(url)
    const res = {
      url: url,
      component: `React.lazy(() => import('${'@/pages/' + item}'))`,
    }
    routesMap.push(res)
  })
  return routesMap
}

module.exports = createRoutes
