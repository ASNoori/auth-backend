import express from 'express';
import {CheckUser} from '../controllers/Login.js';
import { InsertVerifyUser,InsertSignUpUser } from '../controllers/Signin.js';
const router = express.Router();


router.get('/:token',async(req,res)=>{
try{
  const response = await InsertSignUpUser(req.params.token)
  res.status(200).send(response);
}catch(e){
  console.log(e);
  res.status(500).send(
    `<html>
    <body>
     <h4>link expired...</h4>
    </body>
    </html>`
  )
}
})

router.post('/verify',async(req,res)=>{
try{
   const {name,email,password} = await req.body;
   console.log(name,email,password);
   const registerCredentials = await CheckUser(email)
   console.log('registered:',registerCredentials);
   if(registerCredentials === false){
    await InsertVerifyUser(name,email,password)
    res.status(200).send(true);
   }else if(registerCredentials === true){
    res.status(200).send(false);
   }else if(registerCredentials === 'Server Busy'){
    res.status(500).send('Server Busy');
   }
}catch(err){
  console.log(err);
}
})


export default router;