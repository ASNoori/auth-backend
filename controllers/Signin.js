import User from '../models/User.js';
import {sendMail} from './sendMail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import VerifyUser from '../models/VerifyUser.js';
import dotenv from 'dotenv';
dotenv.config();

async function InsertVerifyUser(name,email,password){
    try{
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       const token = generateToken(email);
       const newUser = new VerifyUser({
           name:name,
           email:email,
           password:hashedPassword,
           token:token
       })
      //  const activationLink = `http://localhost:4000/signin/${token}`
      const activationLink = `https://auth-be-1n5q.onrender.com/signin/${token}`
       const content = `<h4>Hi there,</h4>
       <h5>Welcome to the app</h5>
       <p>Thankyou for signin</p>
       <p>Click on the below link to activate</p>
       <a href="${activationLink}">Click Here</a>
       <p>regards</p><p>Team</p>` 
       await newUser.save();
       sendMail(email,'VerifyUser',content);
    }catch(e){
    console.log(e)
    }
}

function generateToken(email){
    const token = jwt.sign(email,process.env.signup_secret_token)
    return token;
}

async function InsertSignUpUser(token){
    try{
      const userVerify = await VerifyUser.findOne({token:token});
      if(userVerify){
        const newUser = new User({
            name:userVerify.name,
            email:userVerify.email,
            password:userVerify.password,
            forgetPassword:{}
        });
        await newUser.save();
        await userVerify.deleteOne({token:token})
        const content = `<h1>Registration Successful</h1>
        <p>You are successfully registered</p>`;
        sendMail(newUser.email,"Registration Successful",content)
        return `<h1>Registration Successful</h1>
        <p>You are successfully registered</p>`;
      }
     return `<h4>Registration failed</h4> <p>Link expired</p>`
    
   
    }catch(err){
      console.log(err);
      return `<html>
      <body>
      <h4>Registration Failed</h4>
      <p>unexpected error happened</p>
      </body></html>`;
    }
}

export {InsertVerifyUser,InsertSignUpUser}