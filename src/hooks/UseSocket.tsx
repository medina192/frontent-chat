import React, { useState, useEffect, useCallback, useRef } from 'react';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';


// http://localhost:3001
// http://161.35.224.248:3001

const connectSocketServer = () => {
    const socket = io("http://localhost:3001", {
    transports: ['websocket']
  });
  return socket;
}

interface UseSocketProps {
  serverPath: string
}

const UseSocket = ( serverPath : string ) => {

    const [ socket, setSocket ] = useState<any>( null );
    const [online, setOnline] = useState(false);

    const connectSocketJustFirstTime = useRef<boolean>(false);

    
    const connectSocket = useCallback( () => {

            const token = localStorage.getItem('token-friend-chat');

            const socketTemp = io(serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                  token
                }
            });
            connectSocketJustFirstTime.current = true;
            setSocket(socketTemp);

    }, [ serverPath ] );


    const disconnectSocket = useCallback( () => {
      socket?.disconnect();
  }, [socket] );

  

    useEffect(() => {
      if(!connectSocketJustFirstTime.current)
      {
        connectSocket();
      }
      return () => {

        disconnectSocket()
      }
    }, [connectSocket, disconnectSocket])



  
    useEffect(() => {
      setOnline(socket?.connected);
    }, [socket]);
  


    useEffect(() => {
      socket?.on("connect", () => {
        setOnline(true);
      });
    }, [socket]);


  
    useEffect(() => {
      socket?.on("disconnect", () => {
        //console.log('useEffect disconnect', socket?.connected)
        setOnline(false);
      });
    }, [socket]);



  

    return {
      socket,
      connectSocket,
      disconnectSocket
    }

}

export default UseSocket
