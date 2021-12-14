class Hello {
  apply(compiler) {
    compiler.hooks.compilation.tap('Hello', (compilation) => {
      console.log('Hello 吕肥肥')
    })
  }
}

module.exports = Hello