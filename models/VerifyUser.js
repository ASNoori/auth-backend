import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true 
    },
    token:{
        type:String,
        required:true  
    },
    // collection:'VerifyUser'
});

const verifyModel = mongoose.model("VerifyUser",verifySchema);

//  module.exports = userModel;
export default verifyModel;
//  module.exports=mongoose.model('VerifyUser',verifySchema)