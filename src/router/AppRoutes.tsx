import React, {useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route} from "react-router-dom";
import ChatScreen from '../components/screens/ChatScreen';
import LoginScreen from '../components/screens/LoginScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';



import axios from  'axios';
import NotFound from '../components/screens/NotFound';
import RootComponent from '../components/RootComponent';
import WelcomeScreen from '../components/screens/WelcomeScreen';
import AuxRoutesScreen from '../components/screens/AuxRoutesScreen';
import LoadingScreen from '../components/reuComponents/LoadingScreen';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { login, loginUser, logout } from '../slices/userSlice';
import { useNavigate } from 'react-router';
import { generalCallApi } from '../services/api/apiCalls';

const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWQ2NGY2MjNjZDRiOGY3NGFkYTg1YWUiLCJleHAiOjE2NDE0NDU3NzgsImlhdCI6MTY0MTQzNDk3OH0.3inDCnASiF6CDhYURZ8mJN-96EVv5On2SSg3Dc06pSY';

/*
axios.interceptors.request.use( config => {
    // Do something before request is sent
    const aux = config?.headers;
    if(aux)
    {
        aux.authorization = `Bearer ${t}`;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
*/

const AppRoutes = () => {
  

  
    const [checkAuthFirstLoad, setCheckAuthFirstLoad] = useState(false);

    const user = useSelector((state: RootState) => state.user);

    const dispatch = useAppDispatch()


    useEffect(() => {

        const token = localStorage.getItem('token-friend-chat');

        if(user.isLogged)
        {
            setCheckAuthFirstLoad(true);
        }
        else{

            if(token)
            {

                generalCallApi('Post', 'api/auth/authToken', {}, token)
                .then( ( data: any)  => {
                    const resp = data?.data;

                    dispatch(login({
                        isLogged: true,
                        name: resp.user.name,
                        uid: resp.user.uid,
                    }));
                    setCheckAuthFirstLoad(true);
                    
                })
                .catch(error => {
                    console.log('error private', error.request.response);
                    setCheckAuthFirstLoad(true);
                })
            }
            else{
                setCheckAuthFirstLoad(true);
            }
        }
        

        return () => {
            const rememberMe = localStorage.getItem('rememeber-friend-chat');
            if(!rememberMe)
                localStorage.removeItem('token-friend-chat');
        }

        const alejandro: RegExp = /ab+c/;
        //console.log(alejandro.test('abc'));

        const alejandro1 = /alejandro/;
        //console.log(alejandro1.test('alejandro es'));
        //console.log('3','alejandro es'.match(alejandro1));
    }, [dispatch, user.isLogged])


    return (
        <BrowserRouter>
            <Routes>
                {
                    checkAuthFirstLoad && (
                        <Route path="/chat" element={ <RootComponent /> }>
                            <Route path="auth" element={ <PublicRoutes /> } >
                                <Route path="login" element={ <LoginScreen /> } />
                                <Route path="register" element={ <RegisterScreen /> } />
                            </ Route>
                            <Route path="messages" element={ <PrivateRoutes /> } />
                        </ Route>
                    )
                }

                {
                    checkAuthFirstLoad ? (
                        <Route path="/" element={ <AuxRoutesScreen /> } >
                            <Route path="/" element={ <WelcomeScreen /> } />
                            <Route path="*" element={ <NotFound /> } />
                        </Route>
                    )
                    :
                    (
                        <Route path="*" element={ <LoadingScreen /> } />
                    )
                }



            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
