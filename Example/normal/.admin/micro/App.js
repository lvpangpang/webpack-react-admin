import React, { Suspense, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Fallback } from '../common'
import 'nprogress/nprogress.css'
import Root from '@@/.admin/root'
import Layout from '@@/.admin/layout'
import routesMap from '@@/.admin/routes'
import microList from '@@/.admin/microRoutes.js'

function Main() {
  const [resultRoutesList, setResultRoutesList] = useState({ ...microList, ...routesMap })
  console.log(resultRoutesList)

  // useEffect(() => {
  //   microList()
  //     .then(([remoteRoutesMap]) => {
  //       setResultRoutesList({
  //         ...remoteRoutesMap,
  //         ...routesMap,
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  return (
    <Layout>
      <Suspense fallback={<Fallback />}>
        <Switch>
          {Object.keys(resultRoutesList).map((key) => {
            return <Route exact key={key} path={key} component={resultRoutesList[key]} />
          })}
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default function App() {
  return (
    <Root>
      <Main />
    </Root>
  )
}
