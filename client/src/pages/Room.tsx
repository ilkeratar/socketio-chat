interface ChildProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    room: string;
    setRoom: React.Dispatch<React.SetStateAction<string>>;
    setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
    socket:any;
}
const Room = ({username,setUsername,room,setRoom,setChatScreen,socket}:ChildProps) => {

    const sendRoom=()=>{
        let data = {
            roomName:room,
            nickname:username
        }
        socket.emit('joinRoom',data);
        setChatScreen(true);
    }

    return (
        <div className={"bg-black h-[100vh] flex items-center justify-center"}>
            <div className="w-2/3 h-[350px] bg-gray-600 md:w-[550px] flex flex-col space-y-4 p-3 items-center">
                <h1 className={"text-white font-bold text-3xl mt-10"}>Chat<span className={"text-orange-500"}>Box</span> </h1>
                <input value={username} onChange={e=> setUsername(e.target.value)} className={"py-1 px-2 outline-none w-full"} type="text" placeholder={"NickName"}/>
                <input value={room} onChange={e=> setRoom(e.target.value)}  className={"py-1 px-2 outline-none w-full"} type="text" placeholder={"Room"}/>
                <div onClick={sendRoom} className="hover:cursor-pointer bg-orange-500 h-10 text-xl tracking-wide rounded text-white w-36 flex items-center justify-center"> <span>Chat!</span></div>
            </div>
        </div>
    );
};

export default Room;