import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from 'antd'

import store from './store'
import styles from './index.less'
import './index.css'

function Index() {
  return (
    <div className={styles.home_box}>
      <div className={styles.text}>{`首页数据: ${store.num}`}</div>
      <Button type="primary" onClick={store.setNum}>
        点我
      </Button>
      <br />
      <div className={styles.link}>
        <Link to={'/detail'}>详情</Link>
        <Link to={'/order'}>订单</Link>
      </div>
    </div>
  )
}

export default observer(Index)
