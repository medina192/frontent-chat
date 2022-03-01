import React, { useState, useRef, useEffect } from 'react';
import UserChatBox from '../reuComponents/UserChatBox';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { bringMessages } from '../../slices/messagesSlicer';

import '../../styles/screens/chatScreen.css';
import '../../styles/partComponents/users-side.css';


const UsersSide = ({socket}: any) => {


    const [usersFriends, setUsersFriends] = useState([]);


    const dispatch = useAppDispatch()

    const user = useSelector((state: RootState) => state.user);
    const moveState = useSelector((state: RootState) => state.move);



    const firstTime = useRef(false);

    socket?.on('load-all-users', (newUsers: any) => {


        if (newUsers && !firstTime.current)
        {
            const usersFriends = newUsers.filter( (u: any) => u.uid !== user.uid);
            setUsersFriends( usersFriends );
            if(usersFriends.length > 0)
            {

                dispatch(bringMessages({ uid: user.uid, friendUid: usersFriends[0].uid,
                    friendName: usersFriends[0].name }))
                .then(( data: any) => {
                    //console.log('data', data);
                    firstTime.current = true;
                })
                .catch(error => {
                  console.log('error dispatch', error.request);
                })
            }
        }
        else{
            const usersFriends = newUsers.filter( (u: any) => u.uid !== user.uid);
            setUsersFriends( usersFriends );
        }
    })
    




    

    return (
        <div className={`cs-con-user-side 
            ${moveState.showChatScreen ? 'move-to-chat' : ''}
            ${moveState.showUsersScreen ? 'move-to-users' : ''}`}>
            <div className='cs-con-image-hello'>
            <img className='cs-img-avatar'
                     src="https://previews.123rf.com/images/provector/provector1502/provector150200279/37008789-piso-usuario-hombre-de-negocios-de-dise%C3%B1o-perfil-avatar-icono-y-larga-sombra-ilustraci%C3%B3n-vectorial-p.jpg" 
                     alt='avatar'
                />
                <p className='cs-welcome-msg'>Hola {user.name}</p>
            </div>


            <p className='cs-title-chats'>Friends</p>
            {
                usersFriends.length !== 0 ?
                (

                    usersFriends.map( (userFriend, index)=> {
                        return(
                            <UserChatBox  
                                userFriend={ userFriend } user={ user } key={index}
                            /> 
                        )
                    })
                )
                :
                (
                    <p>Loading</p>
                )
            }
        </div>
    )
}

export default React.memo(UsersSide);

/*

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */


