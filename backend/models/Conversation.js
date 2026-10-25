const mongoose=require('mongoose');
module.exports=mongoose.model('Conversation',new mongoose.Schema({post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],lastMessageAt:{type:Date,default:Date.now}},{timestamps:true}));
