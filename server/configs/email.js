import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this based on your provider
  auth: {
    user: process.env.EMAIL_USER, // Your professional email
    pass: process.env.EMAIL_PASS // Your app password
  }
});

export default transporter;
