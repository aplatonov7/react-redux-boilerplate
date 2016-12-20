import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { purgeCache } from '../utils'

const router = express.Router()

router.get('*', (req, res) => {
  let scripts = []
  let styles = []

  if (process.env.NODE_ENV === 'development') {
    [
      '../../app/redux/_configureStore',
      '../../app/sagas/_rootSaga',
      '../../app/routes',
      '../../app/components/Html',
    ].forEach(purgeCache)

    let mainChunk = res.locals.webpackStats.toJson().assetsByChunkName.main
    if (!Array.isArray(mainChunk)) mainChunk = [mainChunk]
    scripts = scripts.concat(mainChunk.filter(e => e.slice(-3) === '.js'))
    styles = styles.concat(mainChunk.filter(e => e.slice(-4) === '.css'))
  } else {
    scripts = ['main.js']
    styles = ['styles.css']
  }

  /* eslint-disable global-require */
  const configureStore = require('../../app/redux/_configureStore').default
  const rootSaga = require('../../app/sagas/_rootSaga').default
  const routes = require('../../app/routes').default
  const Html = require('../../app/components/Html').default
  /* eslint-enable global-require */

  const store = configureStore()
  store.runSaga(rootSaga)

  match({ routes: routes(store), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const state = store.getState()
      const inlineCss = global.inlineCss
      const html = renderToStaticMarkup((
        <Html initialState={state} scripts={scripts} styles={styles} inlineStyles={inlineCss}>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </Html>
      ))
      res.send(`<!doctype html>${html}`)
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default router
