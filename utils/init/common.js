// 去掉后缀名以及最后的index路径
function replaceIndex(str) {
  return str && str.replace(/(\/index)?\.[jt]sx?/g, '')
}

// 排除一些文件格式
function checkFileType(url) {
  const arr = url.split('/')
  const len = arr.length
  const lastItem = arr[len - 1]
  if (['store', 'api'].indexOf(lastItem) !== -1) {
    return false
  }
  if (/[A-Z]/.test(lastItem.charAt(0))) {
    return false
  }
  return true
}

// 动态路由必须是[id]这种命名格式的文件或者文件夹
function dynamicMatch(url) {
  if (url.indexOf('[') !== -1) {
    return url.replace(/\[/g, ':').replace(/\]/g, '')
  }
  return url
}

module.exports = {
  replaceIndex,
  checkFileType,
  dynamicMatch
}
