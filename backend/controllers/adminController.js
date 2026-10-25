const Post=require('../models/Post');
exports.posts=async(req,res)=>{const posts=await Post.find().sort({createdAt:-1}).populate('user','name email area');res.json({posts});};