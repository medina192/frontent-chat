import React, { useState } from 'react';
import '../../styles/reuComponents/navBar.css';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store';
import { login, loginUser, logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router';
import { BsBugFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { moveToChat, moveToUsers } from '../../slices/moveScreenSlice';

const NavBar = ({ socket }: any) => {

    const user = useSelector((state: RootState) => state.user);
    const moveState = useSelector((state: RootState) => state.move);

    const firstLoad = (moveState.showChatScreen !== moveState.showUsersScreen) ? true : false;

    const dispatch = useAppDispatch()

    const [loadingWhileSetOnlineToFalse, setloadingWhileSetOnlineToFalse] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
        setloadingWhileSetOnlineToFalse(true);

        try {
            
            socket.emit('disconnect-user', user.uid);

            dispatch(login({
                isLogged: false,
                name: '',
                uid: '',
            }));
            localStorage.removeItem('token-friend-chat');
            localStorage.removeItem('rememeber-friend-chat');
            setloadingWhileSetOnlineToFalse(false);
            navigate('/chat/auth/login');
            
        } catch (error) {
            console.log('error online to false', error);
            setloadingWhileSetOnlineToFalse(false);
        }
    }


    const moveScreen = () => {
        dispatch(moveToChat({ showUsersScreen: true,
            showChatScreen: false}))
    }

    console.log('first', firstLoad);

    return (
        <div className='nv-container'>
            <button onClick={ moveScreen } 
                className={`nv-back-to-users-btn 
                
                ${moveState.showUsersScreen ? 'nv-hide-back-button': ''}`}>
                <BsArrowLeftCircleFill className='nv-back-arrow-icon'/>
            </button>
            <BsBugFill className='nv-bug-logo'/>
            <div className='nv-title'>Bug Chat</div>
            <button 
                onClick={logout}
                disabled={ loadingWhileSetOnlineToFalse }
                className='g-button nv-btn-logout'>
                {
                    loadingWhileSetOnlineToFalse ? 
                    (
                        <p>Loading </p>
                    )
                    :
                    (
                        <p>Log Out</p>
                    )
                }
            </button>
        </div>
    )
}

export default NavBar
