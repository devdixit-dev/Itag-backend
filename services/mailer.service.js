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

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to,
      subject,
      html
    });

    console.log(`Mail sent`);
  }
  catch (e) {
    console.log('Mailer service crashed', e);
  }
}