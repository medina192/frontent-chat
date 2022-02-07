import React,  {useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/reuComponents/NavBar'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { login, loginUser, logout } from '../slices/userSlice';
import { useNavigate } from 'react-router';


import { generalCallApi } from '../services/api/apiCalls';

const PublicRoutes = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {

        if(user.isLogged)
        {
            navigate('/chat/messages');
        }
        
        /*
        let token = localStorage.getItem('token-friend-chat');
        let rememberMe = localStorage.getItem('rememeber-friend-chat');

        console.log('public')
        if(user.isLogged)
        {
            navigate('/');

        }
        else{
            if(token)
            {
                console.log('fffffffffff', token);
                generalCallApi('Post', 'api/auth/authToken', {}, token)
                .then( data => {
                    const resp = data?.data;
                    console.log('resp', resp);
                    if(token)
                        localStorage.setItem('token-friend-chat', token);
    
                    dispatch(login({
                        isLogged: true,
                        name: resp.user.name,
                        uid: resp.user.uid,
                    }));
                    navigate('/')
                })
                .catch(error => {
                    console.log('error', error);

                })
            }

        }

        */
        
    }, []);


    return (
        <>
            <Outlet />
        </>
    )
}

export default PublicRoutes
