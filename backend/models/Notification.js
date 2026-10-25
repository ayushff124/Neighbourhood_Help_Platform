const mongoose=require('mongoose');
module.exports=mongoose.model('Notification',new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},type:String,message:String,isRead:{type:Boolean,default:false}},{timestamps:true}));
