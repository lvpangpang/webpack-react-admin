const { replaceIndex, dynamicMatch, checkFileType } = require('./common')

function createMicroRoutes() {
  const { microApp } = getAdminConfig
  const { name } = microApp
  const files = glob.sync('**/*.*(js|jsx|tsx|ts)', {
    cwd: __pages,
  })
  const routesMicroMap = []
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


module.exports = createMicroRoutes
