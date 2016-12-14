import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'
import configureStore from './redux/_configureStore'
import rootSaga from './sagas/_rootSaga'

/* Setting up the app store and rendering our root container into DOM */
const store = configureStore()
store.runSaga(rootSaga)
const rootEl = document.getElementById('app')

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    ReactDom.render(<NextApp store={store} />, rootEl)
  })

  module.hot.accept('./sagas/_rootSaga', () => {
    store.close()
    const nextRootSaga = require('./sagas/_rootSaga').default
    store.runSaga(nextRootSaga)
  })
}

ReactDom.render(<App store={store} />, rootEl)
