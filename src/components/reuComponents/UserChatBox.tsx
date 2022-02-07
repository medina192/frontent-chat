import React from 'react';
import '../../styles/reuComponents/user-chat-box.css';

import { useDispatch} from 'react-redux';
import { bringMessages } from '../../slices/messagesSlicer';
import { RootState, useAppDispatch } from '../../store/store';
import { moveToChat, moveToUsers } from '../../slices/moveScreenSlice';

const UserChatBox = ({userFriend, user}: any) => {

    const dispatch = useAppDispatch()

    const setNewCurrentUserAndMessages = () => {
        dispatch(moveToChat({ showUsersScreen: false,
            showChatScreen: true}));
            
        dispatch(bringMessages({ uid: user.uid, friendUid: userFriend.uid,
            friendName: userFriend.name }))
        .then(( data: any) => {
            //console.log('data', data);
        })
        .catch(error => {
          console.log('error dispatch', error.request);
        })
    }


    return (
        <div className='cs-con-user-box' onClick={ setNewCurrentUserAndMessages }>
            <div className='cs-con-avatar-name'>
                <img className='cs-img-avatar'
                    src="https://previews.123rf.com/images/provector/provector1502/provector150200279/37008789-piso-usuario-hombre-de-negocios-de-dise%C3%B1o-perfil-avatar-icono-y-larga-sombra-ilustraci%C3%B3n-vectorial-p.jpg" 
                    alt='avatar'
                />
                <p className='cs-username'>{ userFriend.name }</p>
            </div>

                <div className={`circle-off-online 
                    ${userFriend.online ? 'cs-online' : 'cs-offline'}`}></div>

        </div>
    )
}

export default UserChatBox
