const mongoose=require('mongoose');
module.exports=mongoose.model('Comment',new mongoose.Schema({post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},comment:{type:String,required:true,trim:true}},{timestamps:true}));
