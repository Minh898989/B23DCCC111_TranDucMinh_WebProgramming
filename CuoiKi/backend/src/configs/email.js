const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'minhhh270805@gmail.com', // Replace with your email
        pass: 'dlqw dxze rrkq kglu', // Replace with your app password
    },
});

module.exports = transporter;
