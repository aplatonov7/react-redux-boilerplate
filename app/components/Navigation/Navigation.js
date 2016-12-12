import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import s from './Navigation.scss'

const Navigation = () => (
  <nav className={s.root}>
    <IndexLink className={s.link} activeClassName={s.active} to="/">Home</IndexLink>
    <Link className={s.link} activeClassName={s.active} to="counter">Counter</Link>
  </nav>
)

Navigation.propTypes = {

}

export default Navigation
