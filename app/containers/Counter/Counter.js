import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions, selectCounter } from '../../redux/counter'

import Counter from '../../components/Counter'

export class CounterContainer extends Component {
  static propTypes = {
    increment: PropTypes.func,
    incrementAsync: PropTypes.func,
    reset: PropTypes.func,
    value: PropTypes.number,
  }

  incrementByOne = () => this.props.increment(1)
  incrementByOneAync = () => this.props.incrementAsync(1)

  render() {
    return (
      <Counter
        incrementByOne={this.incrementByOne}
        incrementByOneAync={this.incrementByOneAync}
        reset={this.props.reset}
        value={this.props.value}
      />
    )
  }
}

const mapStateToProps = state => ({
  value: selectCounter(state),
})

export default connect(mapStateToProps, actions)(CounterContainer)
