import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import configureStore from './redux/_configureStore'
import rootSaga from './sagas/_rootSaga'

const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
const store = configureStore(initialState)
store.runSaga(rootSaga)

const rootEl = document.getElementById('app')

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default // eslint-disable-line global-require
    ReactDom.render(<NextApp store={store} />, rootEl)
  })

  module.hot.accept('./sagas/_rootSaga', () => {
    store.close()
    const nextRootSaga = require('./sagas/_rootSaga').default // eslint-disable-line global-require
    store.runSaga(nextRootSaga)
  })
}

ReactDom.render(<App store={store} />, rootEl)
