import { lazy } from 'react' 

const routes= {'/':lazy(() => import('app1/')),
'/list':lazy(() => import('app1/list')),
'/order/detail':lazy(() => import('app1/order/detail')),
'/order':lazy(() => import('app1/order'))}
    
export default routes