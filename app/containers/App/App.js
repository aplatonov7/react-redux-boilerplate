import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import Routes from '../../routes'

import '../../styles/base.scss'

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router routes={Routes(store)} history={browserHistory} />
      </Provider>
    )
  }
}

export default App
