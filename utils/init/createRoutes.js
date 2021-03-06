const fs = require('fs-extra')
const glob = require('glob')
const { replaceIndex, dynamicMatch, checkFileType } = require('./common')
const watchFile = require('./watchFile')
const { __adminRoutes, __pages } = require('../paths')
const { isProd } = require('../index.js')


function createRoutes() {
  const routesMap = getRoutes()
  fs.outputFileSync(
    __adminRoutes,
    `import React from 'react' 

const routes= {${routesMap}}
    
export default routes`
  )
}

if (!isProd()) {
  watchFile(__pages, () => {
    createRoutes()
  })
}

// 获取路径和文件路径的映射对象
function getRoutes() {
  const files = glob.sync('**/*.*(js|jsx|tsx|ts)', {
    cwd: __pages,
  })
  const routesMap = []
  files.forEach((item) => {
    let url = replaceIndex(item)
    url = `/${url === 'index' ? '' : url}`
    url = dynamicMatch(url)
    if (checkFileType(url)) {
      const res = `'${url}': React.lazy(() => import('@/pages/${item}'))`
      routesMap.push(res)
    }
  })
  return routesMap.join(',')
}

module.exports = createRoutes
