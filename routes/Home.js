import express  from "express";
import { AuthorizeUser } from "../controllers/Login.js";
const router = express.Router();

router.get('/',async(req,res)=>{
    const auth_token = await req.headers.authorization;
    try{
       const loginCredentialInfo = await AuthorizeUser(auth_token);
       if(loginCredentialInfo===false){
        res.status(200).send('Invalid Token');
       }else{
        res.json(loginCredentialInfo);
        console.log('data:',loginCredentialInfo)
       }
    }catch(err){
        console.log(err);
    }
})

export default router;