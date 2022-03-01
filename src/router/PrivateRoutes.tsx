import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../components/reuComponents/NavBar'
import ChatScreen from '../components/screens/ChatScreen'


import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router';

import UseSocket from '../hooks/UseSocket';

import { generalCallApi } from '../services/api/apiCalls';



const PrivateRoutes = () => {

    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user);



    if(!user.isLogged)
    {
        navigate('/chat/auth/login');
    }


    const { socket } = UseSocket('http://137.184.224.194:3001');
    //const { socket } = UseSocket('http://localhost:3001');

    const removeUser = useCallback(() => {
      generalCallApi('Post', '/api/auth/logout', {userId: user.uid})
    }, [user.uid]);

    useEffect(() => {
      window.addEventListener('beforeunload', removeUser)
    return () => {

    }
  
    }, [user.uid, socket, removeUser]);







    /*
    window.onbeforeunload = function (e) {
      e = e || window.event;
  
      //socket?.emit('disconnect-user', user.uid);
      // For IE and Firefox prior to version 4
      if (e) {
          e.returnValue = 'Sure?';
      }
  
      // For Safari
      return 'Sure?';
    };

  */
 /*
    window.onbeforeunload = function (event: any) {
      var message = 'Important: Please click on \'Save\' button to leave this page.';
      if (event) {
          event = window.event;
      }
      if (event) {
          event.returnValue = message;
      }
      return message;
  };
*/
    return (
        <>
            <NavBar socket={ socket }/>
            <ChatScreen socket={ socket }/>
        </>
    )
}

export default PrivateRoutes
