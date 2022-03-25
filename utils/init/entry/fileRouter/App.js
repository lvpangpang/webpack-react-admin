import { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import routesMap from '@@/.admin/routes'
import Root from '@@/.admin/root'
import Layout from '@@/.admin/layout'

function Main() {
  return (
    <Layout>
      <Suspense fallback={<div></div>}>
        <Switch>
          {Object.keys(routesMap).map((key) => {
            return <Route exact path={key} component={routesMap[key]} />
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
