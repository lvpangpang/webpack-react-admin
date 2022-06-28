import React from 'react' 

const routes= {'/detail/abc': React.lazy(() => import('@/pages/detail/abc.js')),'/': React.lazy(() => import('@/pages/index/index.js')),'/list': React.lazy(() => import('@/pages/list/index.js')),'/login': React.lazy(() => import('@/pages/login/index.js'))}
    
export default routes