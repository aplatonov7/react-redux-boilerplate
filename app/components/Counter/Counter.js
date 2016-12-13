import React, { PropTypes } from 'react'
import s from './Counter.scss'

const Counter = ({ value, incrementByOne, incrementByOneAync, reset }) => (
  <div className={s.root}>
    Mandatory counter example:
    <div className={s.value}>{value}</div>
    <div className={s.actions}>
      <button type="button" className={s.btn} onClick={incrementByOne}>+1</button>
      <button type="button" className={s.btn} onClick={incrementByOneAync}>+1 Async</button>
      <button type="button" className={s.btn} onClick={reset}>Reset</button>
    </div>
  </div>
)

Counter.propTypes = {
  incrementByOne: PropTypes.func,
  incrementByOneAync: PropTypes.func,
  reset: PropTypes.func,
  value: PropTypes.number,
}

export default Counter
