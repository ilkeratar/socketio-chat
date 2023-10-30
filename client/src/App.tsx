import Room from "./pages/Room.tsx";
import Chat from "./pages/Chat.tsx";
import {useState} from "react";
import {io} from "socket.io-client";

const socket = io('http://localhost:3300');
function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [chatScreen, setChatScreen] = useState(false);
  return (
    <div>
        {
            !chatScreen ? <Room username={username} setUsername={setUsername} room={room} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket} />
            : <Chat username={username} room={room} socket={socket} />
        }

    </div>
  )
}

export default App
