import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout'

function App() {
  return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
