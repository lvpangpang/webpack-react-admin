import React from 'react'
import ReactDOM from 'react-dom'

const Index = React.lazy(() => import('app1/index'))
const List = React.lazy(() => import('app1/list'))
const IndexDetail = React.lazy(() => import('app1/index/detail'))

function App() {
  return (
    <div>
      <React.Suspense fallback="Loading">
        <Index></Index>
        <List></List>
        <IndexDetail></IndexDetail>
      </React.Suspense>
    </div>
  )
}

ReactDOM.render(<App></App>, document.querySelector('#root'))
