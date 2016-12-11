import express from 'express'
import path from 'path'
import webpackMiddleware from './middlewares/webpack'

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000
const host = process.env.HOST ? process.env.HOST : 'localhost'

app.use(webpackMiddleware)

if (process.env.NODE_ENV !== 'development') {
  app.get('*', express.static(path.join(__dirname, '../dist')))
}

/* eslint-disable no-console */
app.listen(port, host, (err) => {
  if (err) console.error(err)

  console.info(`SERVER: Listening at ${host}:${port}`)
})
