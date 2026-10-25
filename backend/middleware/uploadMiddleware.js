const multer=require('multer'); const path=require('path'); const fs=require('fs');
const dir=path.join(__dirname,'../uploads'); fs.mkdirSync(dir,{recursive:true});
const storage=multer.diskStorage({destination:(_,__,cb)=>cb(null,dir),filename:(_,file,cb)=>cb(null,Date.now()+'-'+file.originalname.replace(/[^a-zA-Z0-9._-]/g,'_'))});
module.exports=multer({storage,limits:{fileSize:5*1024*1024}});
