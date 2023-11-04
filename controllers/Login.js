import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../redis.js';
import dotenv from 'dotenv';
dotenv.config();

const CheckUser = async (email)=>{
    try{
           const user = await User.findOne({email:email })
           if(user){
            return true;
           }
         return false;
    }catch(e){
           return e;
    }
}

const AuthenticateUser=async(email,password)=>{
    try{
        const userCheck = await User.findOne({email:email});
        const validPassword = await bcrypt.compare(password,userCheck.password);
        console.log(validPassword);
        if(validPassword){
            const token = jwt.sign({email},process.env.login_secret_token);
            const response={
                id:userCheck._id,
                name:userCheck.name,
                email:userCheck.email,
                token:token,
                status:true

            }
            // await client.connect();
            await client.set(`key-${email}`,JSON.stringify(response))
            const updatedUser = await User.findOneAndUpdate({email:userCheck.email},{$set:{token:token}},{new:true});
            if (!updatedUser) {
          // where the user was not found or the update failed.
          return 'User not found or token update failed';
           }
            return response;
        }
        return 'Invalid Username or Password';
    }catch(err){
     console.log(err);
     return 'Server Busy'
    }
}

const AuthorizeUser = async(token)=>{
  try{
  const decodedToken = jwt.verify(token,process.env.login_secret_token);
  if(decodedToken){
    const email=decodedToken.email;
    const auth=await client.get(`key-${email}`);
    if(auth){
        const data= JSON.parse(auth);
        return data;
    }else{
        const data=await User.findOne({email:email})
        return data;
    }
  }
  return false;
  }catch(e){
    console.log(e);
  }
}
export {CheckUser,AuthenticateUser,AuthorizeUser};
