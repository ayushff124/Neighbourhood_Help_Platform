const mongoose=require('mongoose');
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},phone:String,area:{type:String,required:true},password:{type:String,required:true},role:{type:String,enum:['user','admin'],default:'user'},isVerified:{type:Boolean,default:false},otpHash:String,otpExpiresAt:Date,avatar:String},{timestamps:true});
module.exports=mongoose.model('User',schema);
