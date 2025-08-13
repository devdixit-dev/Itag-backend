import mailer from 'nodemailer';

const transporter = mailer.createTransport({
  host: process.env.HOST_URI,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export default transporter;