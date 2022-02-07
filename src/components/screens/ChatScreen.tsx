import React, { useState, useEffect, useRef } from 'react';
import '../../styles/screens/chatScreen.css'
import ChatSide from '../partComponents/ChatSide';
import UsersSide from '../partComponents/UsersSide';

import { fromEvent } from 'rxjs';

//const listener = fromEvent(window, 'scroll');
const listener = fromEvent(window, 'resize');

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  

const ChatScreen = ({ socket }: any) => {

    const [ moveToChat, setMoveToChat ] = useState<boolean>(false);

    listener.subscribe((e: any) => {
        //console.log('e ', e.currentTarget?.outerWidth);
        //console.log('e ', e.currentTarget);
    })
    

    return (
        <div className='cs-main-container'>
            <UsersSide moveToChat={ moveToChat } setMoveToChat={ setMoveToChat } socket={ socket }/>
            <ChatSide moveToChat={ moveToChat } setMoveToChat={ setMoveToChat }  socket={ socket }/>
        </div>
    )
}

export default ChatScreen
