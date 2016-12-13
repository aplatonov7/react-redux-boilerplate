import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './_rootReducer'
import rootSaga from '../sagas/_rootSaga'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
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

  sagaMiddleware.run(rootSaga)

  /* HMR support */
  if (module.hot) {
    module.hot.accept('./_rootReducer', () => store.replaceReducer(rootReducer))
  }

  return store
}
