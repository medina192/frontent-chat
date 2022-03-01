import React,  {useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/reuComponents/NavBar'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router';


const PublicRoutes = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {

        if(user.isLogged)
        {
            navigate('/chat/messages');
        }
        
    }, []);


    return (
        <>
            <Outlet />
        </>
    )
}

export default PublicRoutes
