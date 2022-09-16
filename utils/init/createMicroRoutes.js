const fs = require('fs-extra')
const glob = require('glob')
const { replaceIndex, dynamicMatch, checkFileType } = require('./common')
const { __pages, __microRoutes, getAdminConfig } = require('../index.js')
const { microApp } = getAdminConfig
const { name } = microApp || {}

function createMicroRoutes() {
  const { exposesConfig, routes } = getMicroRoutes()
  fs.outputFileSync(
    __microRoutes,
    `import { lazy } from 'react' 

const routes= {${routes.join(',\n')}}
    
export default routes`
  )

  return exposesConfig 
}

function getMicroRoutes() {
  const files = glob.sync('**/*.*(js|jsx|tsx|ts)', {
    cwd: __pages,
  })
  const routes = []
  const exposesConfig = {}
  files.forEach((item) => {
    let url = replaceIndex(item)
    url = `/${url === 'index' ? '' : url}`
    url = dynamicMatch(url)
    if (checkFileType(url)) {
      exposesConfig['.' + url] = `@/pages/${item}`
      let routesItem = `'${url}':lazy(() => import('${name}${url}'))`
      routes.push(routesItem)
    }
  })
  // exposesConfig['./routes'] = __microRoutes
  return {
    routes,
    exposesConfig,
  }
}

module.exports = createMicroRoutes
