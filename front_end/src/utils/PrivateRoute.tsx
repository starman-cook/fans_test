import React, { Suspense, useContext} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { AuthContext } from './AuthRoute'



const PrivateRoute: React.FunctionComponent = (): React.ReactElement => {
    const value = useContext(AuthContext)
    const location = useLocation()

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
        {value && value?.user?.id
        ? 
            <Outlet />
        :
            <Navigate to='/login' replace state={{from: location}} />}
        </Suspense>
    )
}

export default PrivateRoute