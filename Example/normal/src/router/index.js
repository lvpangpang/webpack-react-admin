import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = React.lazy(() => import(/* webpackChunkName: "/pages/index/index" */ '../pages/index'))
const Detail = React.lazy(() => import(/* webpackChunkName: "/pages/detail/abc" */ '../pages/detail/abc'))
const List = React.lazy(() => import(/* webpackChunkName: "pages/list/index" */ '../pages/list'))

export default function Index() {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/list" component={List} />
      </Switch>
    </Suspense>
  )
}
