import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
interface Mail {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
dotenv.config();
// @ts-ignore
var transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SSL ? true : false,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
});

const sendEmail = ({ to, subject, text, html }: Mail) => {
  var mailOptions = {
    from: process.env.EMAIL_AUTH_FROM,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log('Not Working!! TRY SOMETHING NEW' + error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
  });
};

export { sendEmail };
