import React from 'react' 

const routes= {'/detail': React.lazy(() => import('@/pages/detail/index.js')),'/': React.lazy(() => import('@/pages/index/index.js')),'/list': React.lazy(() => import('@/pages/list/index.js')),'/login': React.lazy(() => import('@/pages/login/index.js'))}
    
export default routes