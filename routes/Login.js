import express from "express";
import { AuthenticateUser } from "../controllers/Login.js";

const router = express.Router();

router.post('/',async(req,res)=>{
const{email,password}=await req.body;
try{
const loginCredential = await AuthenticateUser(email,password);
console.log(loginCredential);
if(loginCredential==='Invalid Username or Password'){
    res.status(200).send('Invalid Username or Password');
}else if(loginCredential==='Server Busy'){
    res.status(200).send('Server Busy');
}else{
    res.status(200).json({token:loginCredential.token});
}
}catch(err){
    console.log(err);
}
})

export default router;
