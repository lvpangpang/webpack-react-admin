import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>
      <div>首页</div>
      <div>
        <Link to="/order">订单</Link>
      </div>

      <div>
        <Link to="/list">列表</Link>
      </div>
    </div>
  )
}

export default Index
