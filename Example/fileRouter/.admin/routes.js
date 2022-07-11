import React from 'react' 

const routes= {'/detail': React.lazy(() => import('@/pages/detail/index.js')),'/': React.lazy(() => import('@/pages/index/index.js')),'/list': React.lazy(() => import('@/pages/list/index.js')),'/login': React.lazy(() => import('@/pages/login/index.js')),'/my/:id/abc': React.lazy(() => import('@/pages/my/[id]/abc.js')),'/my/:id': React.lazy(() => import('@/pages/my/[id]/index.js')),'/my': React.lazy(() => import('@/pages/my/index.js')),'/order': React.lazy(() => import('@/pages/order/index.js'))}
    
export default routes