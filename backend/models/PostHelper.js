const mongoose=require('mongoose');
const schema=new mongoose.Schema({post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},helper:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},helperNote:{type:String,default:''}},{timestamps:true}); schema.index({post:1,helper:1},{unique:true}); module.exports=mongoose.model('PostHelper',schema);
