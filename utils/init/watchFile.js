const chokidar = require('chokidar')

function watchFile(path, cb) {
  const watcher = chokidar.watch(path)
  watcher.on('all', cb)
}

module.exports = watchFile
