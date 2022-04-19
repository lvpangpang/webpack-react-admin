const chalk = require('chalk')
const Table = require('cli-table')
const { extname } = require('path')
const { info } = require('./info')

// 打包结果图表
function beautifyBuild(stats) {
  const statsJson = stats.toJson()
  const { time, assets } = statsJson
  const resTime = time < 1000 ? `${time}ms` : `${(time / 1000).toFixed(2)}s`
  info(`总耗时：${resTime}`)
  const table = new Table({
    head: ['Name', 'Size', 'ChunkNames', 'Type'],
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    },
  })
  assets.forEach((item) => {
    let { name, size, chunkNames } = item
    const m1 = 1024 * 1024
    const k1 = 1024
    const k200 = 1024 * 200
    let resSize = ''
    if (size > m1) {
      resSize = `${(size / m1).toFixed(2)} M`
    } else {
      resSize = size > k1 ? `${(size / k1).toFixed(2)} Kb` : `${size} B`
    }
    if (size >= k200) {
      resSize = chalk.hex('#FFF40F').bold(`${resSize} [big]`)
    }
    const type = extname(name)
    if (name.indexOf('js/') === 0) {
      name = name.substring(3)
    } else if (name.indexOf('css/') === 0) {
      name = name.substring(4)
    }
    table.push([name, resSize, chunkNames.join(), type.substring(1)])
  })
  console.log(chalk.blue(table.toString()))
}

module.exports = beautifyBuild
