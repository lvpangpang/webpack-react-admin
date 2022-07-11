const HtmlWebpackPlugin = require('html-webpack-plugin')
const cheerio = require('cheerio')
const { isProd, getAdminConfig } = require('../utils')
const defaultExternals = require('../config/externals.js')

const { externals, title, icon } = getAdminConfig
const resultExternals = Object.values({ ...defaultExternals, ...externals }).map((item) => {
  return item.url
})

class HtmlResources {
  apply(compiler) {
    compiler.hooks.compilation.tap('done', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        'HandleHtmlResources',
        (htmlPluginData, callback) => {
          const $ = cheerio.load(htmlPluginData.html)
          if (isProd()) {
            this.addScripts($)
          }
          if (title) {
            $('title').html(title)
          }
          if (icon) {
            $('head').append(`<link rel="icon" type="image/png" href=${icon} />`)
          }
          htmlPluginData.html = $.html()
          callback(null, htmlPluginData)
        }
      )
    })
  }
  addScripts($) {
    resultExternals.forEach((src) => {
      if (src) {
        $('body').append(`<script src="${src}"></script>`)
      }
    })
  }
}

module.exports = HtmlResources
