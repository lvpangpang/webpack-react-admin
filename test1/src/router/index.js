import React, { Suspense } from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import history from './history'

const Home = React.lazy(() => import('../pages/home'))
const Detail = React.lazy(() => import('../pages/detail'))
const List = React.lazy(() => import('../pages/list'))

export default function Index() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/list" component={List} />
        </Switch>
      </Suspense>
    </Router>
  )
}
