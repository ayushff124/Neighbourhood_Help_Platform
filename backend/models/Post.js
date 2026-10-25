const mongoose=require('mongoose');
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},title:{type:String,required:true,trim:true},description:{type:String,default:''},category:{type:String,default:'General'},image:String,area:{type:String,required:true},location:{type:String,required:true},lat:Number,lng:Number,status:{type:String,enum:['pending','in_progress','solved'],default:'pending'},isUrgent:{type:Boolean,default:false}},{timestamps:true});
schema.index({createdAt:-1}); schema.index({area:1,category:1});
module.exports=mongoose.model('Post',schema);
