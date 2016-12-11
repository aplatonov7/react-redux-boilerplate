import path from 'path'
import express from 'express'

const router = express.Router()

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.config')({ dev: true })
  const webpack = require('webpack')
  const compiler = webpack(config)
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  })
  const fs = webpackDevMiddleware.fileSystem

  router.use(webpackDevMiddleware)
  router.use(require('webpack-hot-middleware')(compiler))

  router.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send(file.toString())
      }
    })
  })
}
/* eslint-enable global-require */

export default router
