import React, { Suspense } from 'react'

const List = React.lazy(() => import('app1/list'))

function Index() {
  return (
    <div>
      首页
      <Suspense fallback={'loading...'}>
        <List />
      </Suspense>
    </div>
  )
}

export default Index
