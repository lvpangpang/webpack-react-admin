import React from 'react' 

const routes= {'/list': React.lazy(() => import('app1/list')),'/order/detail': React.lazy(() => import('app1/order/detail')),'/order': React.lazy(() => import('app1/order'))}
    
export default routes