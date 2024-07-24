import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL.USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = (to, subject, text)=>{
    const mailOptions ={
        from: process.env.EMAIL.USER,
        to: to,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
}