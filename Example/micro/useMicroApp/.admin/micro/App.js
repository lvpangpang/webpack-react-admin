import { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Root from '@@/.admin/root'
import Layout from '@@/.admin/layout'
import routesMap from '@@/.admin/routes'
import microList from '@@/.admin/microList.js'
import { Fallback } from '../common'
import 'nprogress/nprogress.css'

microList().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})

const resultRoutesList = {
  ...routesMap,
}

function Main() {
  return (
    <Layout>
      <Suspense fallback={<Fallback />}>
        <Switch>
          {Object.keys(resultRoutesList).map((key) => {
            return <Route exact path={key} component={resultRoutesList[key]} />
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
