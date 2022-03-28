import React from 'react' 

const routes= {'/list': React.lazy(() => import('@/pages/list/index.js')),'/order/detail': React.lazy(() => import('@/pages/order/detail/index.js')),'/order': React.lazy(() => import('@/pages/order/index.js'))}
    
export default routes