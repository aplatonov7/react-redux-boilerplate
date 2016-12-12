import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore() {
  const middleware = [thunk]
  if (process.env.NODE_ENV === 'development') middleware.push(logger())
  const initialState = {}

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      process.env.NODE_ENV === 'development' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
    ),
  )

  /* HMR support */
  if (module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(require('./rootReducer').default) //eslint-disable-line
    )
  }

  return store
}
