import React from 'react';
import '../../styles/reuComponents/message.css'

const Message = ({ msg, myMsg }: any) => {

    console.log(msg.createdAt);

    const newDate = new Date(msg.createdAt);

    const day = newDate.getDay();
    const year = newDate.getFullYear();
    const month = newDate.toString().slice(4,7);
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();


    return (
        <>
            <div className={ myMsg ? 'cs-con-message-mine' : 'cs-con-message' }>
                <p className='cs-text-message'>{msg?.message}</p>
            </div>
            <p className='cs-date-msg'>{day+' '+month+' '+year+' | '+hour+':'+minutes}</p>
        </>
    )
}

export default Message
