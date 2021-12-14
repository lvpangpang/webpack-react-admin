import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 这里如果引用的是远程资源就可以实现切换路由时候加载的是远程资源
const Home = React.lazy(() => import(/* webpackChunkName: "index" */ '../pages/index'))
const Detail = React.lazy(() => import(/* webpackChunkName: "detail" */ '../pages/detail'))
const List = React.lazy(() => import(/* webpackChunkName: "list" */ '../pages/list'))

function Fallback() {
  useEffect(() => {
    NProgress.start()
    return NProgress.done
  }, [])
  return null
}

export default function Index() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/list" component={List} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
