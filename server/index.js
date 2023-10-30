const express = require('express');
const cors = require('cors');
const {Server} = require("socket.io");
const http = require("http");

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

    socket.on('room',(data)=>{
        socket.join(data);
    })

    socket.on('message',(data)=>{
        socket.to(data.room).emit('messageReturn',data);
    })
})

const PORT = 3300;
server.listen(PORT,()=>{
    console.log('server is running on port: ',PORT);
})