const glob = require('glob')
const fs = require('fs')
const { __pages, __microRoutes } = require('../paths')
const getAdminConfig = require('../getAdminConfig')

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

function createMicroRoutes() {
  const { microApp } = getAdminConfig
  const { name } = microApp
  const files = glob.sync('**/*.*(js|jsx|tsx|ts)', {
    cwd: __pages,
  })
  const routesMicroMap = []
  console.log(files)
  files.forEach((item) => {
    let url = replaceIndex(item)
    url = dynamicMatch(url)
    let _url = `./${url}`
    const res = {
      [_url]: `@/pages/${item}`,
    }
    routesMicroMap.push(res)
  })
  console.log(routesMicroMap)
  return routesMicroMap
}

module.exports = {
  createRoutes,
  createMicroRoutes
}
