import { useLocation } from 'react-router-dom'
import Router from '../router'
import Login from '@/pages/login'

function Layout() {
  const { pathname } = useLocation()
  if (pathname.indexOf('/login') === 0) {
    return <Login></Login>
  }
  return (
    <>
      <div style={{ height: '100px', background: '#108ee9' }}></div>
      <Router></Router>
    </>
  )
}

export default Layout
