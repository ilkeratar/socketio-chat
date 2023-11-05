const mongoose = require('mongoose');

const messageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    room:{type:mongoose.Schema.Types.ObjectId,ref:'Room'},
    timestamp:{
        type:Date,
        default:Date.now,
    },
});

const Message=mongoose.model('Message',messageSchema);
module.exports=Message;