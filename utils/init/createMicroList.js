const fs = require('fs-extra')
const { __microList, getAdminConfig } = require('../index.js')
const { useMicroApp } = getAdminConfig

function createMicroList() {
  if (useMicroApp) {
    const list = []

    const { name } = useMicroApp
    list.push(`import('${name}/routes')`)

    fs.outputFileSync(
      __microList,
      list.length
        ? `
export default function getMicroList() {
  return Promise.all([${list.join()}])
}
  `
        : `
export default function getMicroList() {
  return null
}
  `
    )
  }
}

module.exports = createMicroList
