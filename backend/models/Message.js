const mongoose=require('mongoose');
module.exports=mongoose.model('Message',new mongoose.Schema({conversation:{type:mongoose.Schema.Types.ObjectId,ref:'Conversation',required:true},sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true},isRead:{type:Boolean,default:false}},{timestamps:true}));
