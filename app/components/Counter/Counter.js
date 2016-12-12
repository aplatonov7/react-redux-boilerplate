import React, { PropTypes } from 'react'
import s from './Counter.scss'

const Counter = ({ value, incrementByOne, incrementByThree, reset }) => (
  <div className={s.root}>
    Mandatory counter example:
    <div className={s.value}>{value}</div>
    <div className={s.actions}>
      <button type="button" className={s.btn} onClick={incrementByOne}>+1</button>
      <button type="button" className={s.btn} onClick={incrementByThree}>+3</button>
      <button type="button" className={s.btn} onClick={reset}>Reset</button>
    </div>
  </div>
)

Counter.propTypes = {
  incrementByOne: PropTypes.func,
  incrementByThree: PropTypes.func,
  reset: PropTypes.func,
  value: PropTypes.number,
}

export default Counter
