const express = require('express');
const cors = require('cors');
const {Server} = require("socket.io");
const http = require("http");
const mongoose=require('mongoose');
const User=require('./models/User');
const Room=require('./models/Rooms');
const Message=require('./models/Message');

const dbURL='mongodb+srv://ilkerrxr:asd123@cluster0.73hnodr.mongodb.net/chatbox_db?retryWrites=true&w=majority';
mongoose.connect(dbURL).then(()=>{
    server.listen(PORT,()=>{
        console.log('server is running on port: ',PORT);
    });
}).catch((err)=>{
    console.log("ERROR : "+err);
})

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log("connection: "+socket.id);

    socket.on('joinRoom',async ({nickname,roomName})=>{
        try {
            let user = await User.findOne({nickname});

            if(!user){
                user = new User({nickname});
                await user.save();
            }

            socket.join(roomName);
            socket.emit('yourUserId',user._id);

            const room = await Room.findOne({ name: roomName });
            const messages = await Message.find({ room: room._id }).populate('sender').exec();

            socket.emit('roomHistory', messages);

            socket.to(roomName).emit('message', { sender: 'admin', content: `${nickname} has joined the room.` });
        } catch (e) {
            console.error(e);
        }

    })

    socket.on('sendMessage', async ( data ) => {
        try {
            const formattedData = {
                sender: await User.findOne({ nickname: data.username }),
                content: data.message,
                room:await Room.findOne({ name: data.room })
            };

            const message = new Message({
                content:data.message,
                sender:formattedData.sender,
                room:formattedData.room._id,
            } );
            const savedMessage = await message.save();


            io.to(data.room).emit('message', savedMessage );
        } catch (error) {
            socket.emit('error', 'An error occurred while sending the message.');
            console.error(error);
        }
    });
    socket.on('message',(data)=>{
        socket.to(data.room).emit('messageReturn',data);
    })
})

const PORT = 3300;
