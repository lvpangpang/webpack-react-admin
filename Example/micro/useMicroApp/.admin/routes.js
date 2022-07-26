import React from 'react' 

const routes= {'/': React.lazy(() => import('@/pages/index/index.js'))}
    
export default routes