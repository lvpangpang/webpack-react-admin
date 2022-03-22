import React from 'react'
import ReactDOM from 'react-dom'

const List = React.lazy(() => import('app1/List'))

function App() {
  return (
    <div>
      <React.Suspense fallback="Loading">
        <List></List>
      </React.Suspense>
    </div>
  )
}

ReactDOM.render(<App></App>, document.querySelector('#root'))
