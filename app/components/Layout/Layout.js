import React, { PropTypes } from 'react'
import s from './Layout.scss'
import Navigation from '../Navigation'

const Layout = ({ children }) => (
  <div className={s.root}>
    <Navigation />
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
