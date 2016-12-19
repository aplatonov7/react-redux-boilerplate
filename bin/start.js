import path from 'path'
import sass from 'node-sass'
import cssHook from 'css-modules-require-hook'

const dev = process.env.NODE_ENV === 'development'

const cssHookConfig = {
  generateScopedName: dev ? '[name]__[local]' : '[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: data => sass.renderSync({
    data,
    includePaths: [path.resolve(__dirname, '../app/styles')],
  }).css,
}

if (dev) {
  cssHookConfig.processCss = (css = '') => {
    if (!global.inlineCss) global.inlineCss = ''
    global.inlineCss += css
  }
}

cssHook(cssHookConfig)

global.__CLIENT__ = false

require('../server')
