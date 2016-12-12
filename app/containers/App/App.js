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
    return (
      <Provider store={this.props.store}>
        <Router routes={Routes(this.props.store)} history={browserHistory} />
      </Provider>
    )
  }
}

export default App
