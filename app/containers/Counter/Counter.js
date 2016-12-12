import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions, selectCounter } from '../../redux/counter'

import Counter from '../../components/Counter'

class CounterContainer extends Component {
  static propTypes = {
    incrementCounter: PropTypes.func,
    resetCounter: PropTypes.func,
    value: PropTypes.number,
  }

  incrementByOne = () => this.props.incrementCounter(1)
  incrementByThree = () => this.props.incrementCounter(3)
  reset = () => this.props.resetCounter()

  render() {
    return (
      <Counter
        incrementByOne={this.incrementByOne}
        incrementByThree={this.incrementByThree}
        reset={this.reset}
        value={this.props.value}
      />
    )
  }
}

const mapStateToProps = state => ({
  value: selectCounter(state),
})

export default connect(mapStateToProps, actions)(CounterContainer)
