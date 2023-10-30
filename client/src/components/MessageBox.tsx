import React from 'react';

interface MessageProps{
    username:string,
    msgUsername:string,
    message:string,
    date:string
}
const MessageBox = ({username,msgUsername,message,date}:MessageProps) => {
    return (
        <div className={`${username===msgUsername ? 'flex justify-end' : ''}`}>
            <div className={`w-2/3 h-12 ${username===msgUsername ? 'bg-orange-500  rounded-br-none' : 'bg-blue-500  rounded-bl-none'} text-white text-sm m-2 p-2 rounded-xl`}>
                <div>{message}</div>
                <div className={"w-full flex justify-end text-[11px]"}>{msgUsername} - {date}</div>
            </div>
        </div>
    );
};

export default MessageBox;