import React, {useState, useEffect, useRef } from 'react';
import Message from '../reuComponents/Message';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store';
import '../../styles/screens/chatScreen.css';
import '../../styles/partComponents/chat-side.css';
//import * as Scroll from 'react-scroll';
//import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

//let scroll = Scroll.animateScroll;

const ChatSide = ({socket, moveToChat, setMoveToChat}: any) => {

    const [messages, setMessages] = useState<any[]>([]);

    const messageInput = useRef('');

    const firstTime = useRef(false);

    const chatMessagesStatus = useSelector((state: RootState) => state.messages.status);

    const chatMessages = useSelector((state: RootState) => state.messages.currentMessages);

    const friendInfo = useSelector((state: RootState) => state.messages.currentFriend);
    
    const moveState = useSelector((state: RootState) => state.move);


    useEffect(() => {
      
        setMessages(chatMessages);


    }, [friendInfo.uid, chatMessages]);
    

    const user = useSelector((state: RootState) => state.user, shallowEqual)
    const dispatch = useAppDispatch()

    const sendMessage = (e: any) => {
        e.preventDefault();

        if(messageInput.current.length > 0)
        {

            socket?.emit('private-msg', { 
                myUid: user.uid, 
                friendUid: friendInfo.uid, 
                message: messageInput.current});
        }
        else{
            console.log('the message is empty');
        }

    }

    socket?.on('add-msg-to-chat', (newMessage: any) => {
        (document.getElementById("form") as HTMLFormElement).reset();
        messageInput.current = '';
        setMessages([...messages, newMessage]);
    })



    const updateMessageInput = (e: any) => {
        messageInput.current = e.target.value;
    }


    if(chatMessages.length > 0 && !firstTime.current)
    {
        firstTime.current = true;
        setMessages(chatMessages);
    }



    useEffect(() => {
      
        /*
        scroll.scrollToBottom({
            containerId: 'con-messages',
            duration: 0
        });
        */
    }, []);


    return (
        <div className={`cs-con-chat-side 
        ${ moveState.showUsersScreen ? 'move-to-users' : ''}
        ${moveState.showChatScreen ? 'move-to-chat' : ''}`}>
            <div id="con-messages" className='cs-con-messages'>
                {
                    messages.map((msg, index) => {
                        let myMsg = false;
                        if(msg.from === user.uid)
                            myMsg = true;
                        return(
                            <div key={ index } className={`cs-con-whole-message ${ myMsg ? 'cs-msg-right' : 'cs-msg-left'}`}>
                                <Message myMsg={ myMsg } msg={ msg }/>
                            </div>
                        )
                    })
                }
            </div>
            <form id="form" className='cs-con-write-message' onSubmit={ sendMessage }>
                <input className='cs-input-message' onChange={(e) => updateMessageInput(e) }/>
                <button 
                    onClick={ sendMessage }
                    className='g-button cs-btn-send'>
                    Send
                </button>
            </form>
        </div>
    )
}

export default ChatSide
