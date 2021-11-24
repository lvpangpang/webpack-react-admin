function getProcessArgv(name) {
  const argv = process.argv
  const obj = {}
  argv.forEach((item) => {
    if (item.indexOf('=') > -1) {
      const [key, value] = item.split('=')
      obj[key] = value
    }
  })
  return name ? obj[name] : obj
}

module.exports = {
  getProcessArgv,
}
