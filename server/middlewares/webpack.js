import express from 'express'

const router = express.Router()

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.config')({ dev: true })
  const webpack = require('webpack')
  const compiler = webpack(config)

  router.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    quiet: true,
    publicPath: '/',
    stats: {
      colors: true,
    },
  }))

  router.use(require('webpack-hot-middleware')(compiler))
}
/* eslint-enable global-require */

export default router
