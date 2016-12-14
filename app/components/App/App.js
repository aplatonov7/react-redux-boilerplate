import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import Routes from '../../routes'

import '../../styles/base.scss'

const App = ({ store }) => (
  <Provider store={store}>
    <Router routes={Routes(store)} history={browserHistory} />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
}

export default App
