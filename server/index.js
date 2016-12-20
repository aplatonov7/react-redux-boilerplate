import express from 'express'
import webpackMiddleware from './middlewares/webpack'
import renderMiddleware from './middlewares/render'
import staticMiddleware from './middlewares/static'

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
const host = process.env.HOST ? process.env.HOST : 'localhost'

app.use(webpackMiddleware)
app.use(staticMiddleware)
app.use(renderMiddleware)

/* eslint-disable no-console */
app.listen(port, host, (err) => {
  if (err) console.error(err)

  console.info(`SERVER: Listening at ${host}:${port}`)
})
