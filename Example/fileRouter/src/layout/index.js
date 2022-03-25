import { useLocation } from 'react-router-dom'
import Login from '@/pages/login'

function Layout({ children }) {
  const { pathname } = useLocation()
  if (pathname.indexOf('/login') === 0) {
    return <Login></Login>
  }
  return (
    <>
      <div style={{ height: '100px', background: '#108ee9' }}></div>
      {children}
    </>
  )
}

export default Layout
