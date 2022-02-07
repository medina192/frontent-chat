import React from 'react'
import { Routes, Route} from "react-router-dom";
import { Outlet } from 'react-router-dom'

const RootComponent = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default RootComponent

/*
                <Route path="auth" element={ <PublicRoutes /> }>
                    <Route path="login" element={ <LoginScreen /> } />
                    <Route path="register" element={ <RegisterScreen /> } />
                </ Route>

                <Route path="/" element={ <PrivateRoutes /> } />

                <Route path="*" element={ <NotFound /> } />

*/
