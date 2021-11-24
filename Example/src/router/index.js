import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import history from './history'

// 这里如果引用的是远程资源就可以实现切换路由时候加载的是远程资源
const Home = React.lazy(() =>
  import(/* webpackChunkName: "index" */'../pages/index')
)
const Detail = React.lazy(() =>
  import(/* webpackChunkName: "detail" */ '../pages/detail')
)
const List = React.lazy(() =>
  import(/* webpackChunkName: "list" */ '../pages/list')
)

export default function Index() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/list" component={List} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
