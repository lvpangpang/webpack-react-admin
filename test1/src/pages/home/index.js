import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from 'antd-mobile'

import store from './store'
import styles from './index.less'
import './index.css'
import List from '@/List'

console.log(__ENV__)

function Index() {
  return (
    <div className={styles.home_box}>
      <div className={styles.text}>{`首页数据: ${store.num}`}</div>
      <div>
        <Button type="primary" onClick={store.setNum}>
          点我
        </Button>
      </div>
      <br />
      <div className={styles.link}>
        <Link to={'/detail'}>去详情</Link>
        <Link to={'/list'}>去列表</Link>
      </div>
      <div className="name">吕肥肥</div>
      {/* <List></List> */}
    </div>
  )
}

export default observer(Index)
