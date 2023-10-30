import {useEffect, useState} from "react";
import MessageBox from "../components/MessageBox.tsx";

interface ChildProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    room: string;
    setRoom: React.Dispatch<React.SetStateAction<string>>;
    setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
    socket:any;
}
const Chat = ({username,room,socket}:ChildProps) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([])
    const sendMessage=async ()=>{
        const messageContent={
            username:username,
            message:message,
            room:room,
            date:new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        }
        await socket.emit('message',messageContent);
        setMessageList((prev):any=>[...prev,messageContent])
        setMessage("");
    }
    useEffect(() => {
        socket.on('messageReturn',(data:any)=>{
            setMessageList((prev):any=>[...prev,data]);
        })
    }, [socket]);

    return (
        <div className={"bg-black h-[100vh] flex items-center justify-center"}>
            <div className={"w-2/3 h-[600px] md:w-[550px] bg-gray-500 relative"}>
                <div className={"w-full h-16 bg-gray-700 flex items-center p-2"}>
                    <div className="w-12 h-12 bg-white rounded-full "></div>
                </div>
                <div className={"w-full h-[400px] overflow-y-auto"}>
                    {
                        messageList && messageList.map((msg:any,i:number)=>(
                            <MessageBox key={i} username={username} msgUsername={msg.username} message={msg.message} date={msg.date} />
                        ))
                    }
                </div>
                <div className={"absolute bottom-0 left-0 w-full"}>
                    <input value={message} onChange={e=>setMessage(e.target.value)} className={"w-3/4 h-12 border p-2 outline-none"} type="text" placeholder={"Write your message here..."}/>
                    <button onClick={sendMessage} className={"w-1/4 bg-orange-500 text-white h-12 font-bold tracking-wide hover:opacity-70"}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;