import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    joinedOn:{
        type:Date,
        default:Date.now()
    },
    forgetpassword:{
        time:Date,
        otp:String
    },
    token:{
        type:String
    },
    // collection:'Users'
});

const userModel = mongoose.model('User',userSchema);

//  module.exports = userModel;
export default userModel;

//  module.exports=mongoose.model('VerifyUser',verifySchema)