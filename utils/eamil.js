const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log(transporter);
  //2) Define the eamil options
  const mailOptions = {
    from: 'deng <hello@deng.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
