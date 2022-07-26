import './index.css'

function Layout({ children }) {
  return (
    <>
      <div className="com-header">公共Header</div>
      {children}
    </>
  )
}

export default Layout
