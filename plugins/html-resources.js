const HtmlWebpackPlugin = require('html-webpack-plugin')
const cheerio = require('cheerio')
const { isProd, getAdminConfig } = require('../utils')
const bmsLibExternals = require('../config/externals.js')

const { externals, bmsLib, title, icon, isRem } = getAdminConfig
let resultExternals = {}
if (bmsLib) {
  resultExternals = {
    ...bmsLibExternals,
  }
}
if (externals) {
  resultExternals = {
    ...resultExternals,
    ...externals,
  }
}
resultExternals = Object.values(resultExternals).map((item) => {
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
          if (isRem) {
            $('head').append(
              `<script>!function(e,t){function n(){t.body?t.body.style.fontSize=12*o+"px":t.addEventListener("DOMContentLoaded",n)}function d(){var e=i.clientWidth/10;i.style.fontSize=e+"px"}var i=t.documentElement,o=e.devicePixelRatio||1;if(n(),d(),e.addEventListener("resize",d),e.addEventListener("pageshow",function(e){e.persisted&&d()}),o>=2){var a=t.createElement("body"),s=t.createElement("div");s.style.border=".5px solid transparent",a.appendChild(s),i.appendChild(a),1===s.offsetHeight&&i.classList.add("hairlines"),i.removeChild(a)}}(window,document);</script>`
            )
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
