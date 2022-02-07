import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store';
import { login, loginUser, logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router';

const AuxRoutesScreen = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        
        if(user.isLogged)
        {
            navigate('/chat/messages');
        }

        return () => {

        }
        
    }, []);

    return (
        <>
         <Outlet />   
        </>
    )
}

export default AuxRoutesScreen
