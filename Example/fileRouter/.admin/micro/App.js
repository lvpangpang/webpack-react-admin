import { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import routesMap from '@@/.admin/routes'
import microList from '../../../microApp/.admin/microRoutes.js'
// import microList from '@@/.admin/microList'
import Root from '@@/.admin/root'
import Layout from '@@/.admin/layout'

// microList().then((data) => {
//   console.log(data)
// })
const resultRoutesList = {
  ...microList,
  ...routesMap
}

function Main() {
  return (
    <Layout>
      <div>吕肥肥</div>
      <Suspense fallback={<div></div>}>
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
