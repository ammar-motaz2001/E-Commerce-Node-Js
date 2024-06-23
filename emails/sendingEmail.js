import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { emailTemp } from "./emailTemp.js";
export const sendingEmail=async(email)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail", // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ammarmoataz10@gmail.com",
          pass: "okkzhjpsnzxbdlrg",
        },
      });
    let token=  jwt.sign({email},"myNameisAmmar")
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <ammarmoataz10@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: emailTemp(token), // html body
      });
    
      console.log("Message sent: %s", info.messageId);


}
