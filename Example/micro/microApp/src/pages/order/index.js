import { Link } from 'react-router-dom'

function Order() {
  return (
    <div>
      订单页
      <div>
        <Link to="/order/detail">订单详情</Link>
      </div>
    </div>
  )
}
export default Order
