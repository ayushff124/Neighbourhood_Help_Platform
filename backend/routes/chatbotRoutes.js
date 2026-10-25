const router=require('express').Router();
const {reply}=require('../controllers/chatbotController');
router.post('/',reply);
module.exports=router;