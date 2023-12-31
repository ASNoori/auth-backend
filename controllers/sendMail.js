import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.nodemailer_user,
        pass:process.env.nodemailer_pwd
    },
});
    function sendMail(toEmail,subject,content){
        const mailOptions = {
            from:process.env.nodemailer_user,
            to:toEmail,
            subject:subject,
            html:content
        };
     transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log('error occurred',error)
        }else{
            console.log('Email sent',info.response);
        }
     });
          
    }
export {sendMail}