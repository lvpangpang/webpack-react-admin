import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from 'antd-mobile'

import store from '../home/store'

function Index() {
  return (
    <div className="home-box">
      <div style={{ fontSize: '30px', textAlign: 'center', lineHeight: '2' }}>{store.num}</div>
      <div>
        <Button type="primary" onClick={store.setNum}>
          点我
        </Button>
      </div>
      <br />
      <Link to="/">回首页</Link>
    </div>
  )
}

export default observer(Index)
