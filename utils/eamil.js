const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `deng <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SEND_GRIP_NAME,
          pass: process.env.SEND_GRIP_PASSWORD,
        },
      });
    }
    //1) create a transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(template, subject) {
    //1) Renter HTML based on a pug template
    const html = pug.renderFile(
      path.resolve(__dirname, `../views/emails/${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );
    //2) Define the eamil options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.htmlToText(html),
      // html:
    };
    //3) Create a transporter and send  email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token(valid only for ten minutes)',
    );
  }
};
