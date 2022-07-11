import { useLocation } from 'react-router-dom'
import Login from '@/pages/login'
import './index.css'

function Layout({ children }) {
  const { pathname } = useLocation()
  if (pathname.indexOf('/login') === 0) {
    return <Login></Login>
  }
  return (
    <>
      <div className="com-header">公共Header</div>
      {children}
    </>
  )
}

export default Layout
