import React from 'react';

interface MessageProps{
    myUserId:string | null,
    msgUsername:any,
    message:string,
    date:string
}
const MessageBox = ({myUserId,msgUsername,message,date}:MessageProps) => {
    return (
        <div>
            {
                msgUsername === "admin" ? (
                    <div className={`flex justify-center`}>
                        <div className={`w-2/3 h-9 bg-gray-300 text-black text-sm m-2 p-2 rounded-xl text-center`}>
                            <div>{message}</div>
                        </div>
                    </div>
                ) : (
                    <div className={`${myUserId===msgUsername._id ? 'flex justify-end' : ''}`}>
                        <div className={`w-2/3 min-h-12 ${myUserId===msgUsername._id ? 'bg-orange-500  rounded-br-none' : 'bg-blue-500  rounded-bl-none'} text-white text-sm m-2 p-2 rounded-xl`}>
                            <div>{message}</div>
                            <div className={"w-full flex justify-end text-[11px]"}>{msgUsername.nickname} - {date}</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MessageBox;