import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Layout from './components/Layout'
import Home from './components/Home'
import Counter from './containers/Counter'
import NotFound from './components/NotFound'

const Routes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="counter" component={Counter} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default Routes
