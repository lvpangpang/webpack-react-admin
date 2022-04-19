const chokidar = require('chokidar')

// 监听文件
function watchFile(path, cb) {
  const watcher = chokidar.watch(path)
  watcher.on('all', cb)
}

module.exports = watchFile
