import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'; // 直接加载所有的antd样式即可哈
import Layout from './layout'

function App() {
  return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
