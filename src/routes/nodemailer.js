require('dotenv').config();
const {
    default: axios
} = require('axios');
const server = require('express').Router();
const nodemailer = require('nodemailer');

const {
    EMAIL,
    EMAIL_PASSWORD
} = process.env


server.post('/', (req, res) => {
    
    console.log(EMAIL)
    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'anita.blick75@ethereal.email',
            pass: 'H5pv2DHHQShKXnvmWq'
        }
    });

    let mailDetails = {
        from: 'anita.blick75@ethereal.email',
        to: 'anita.blick75@ethereal.email',
        subject: 'Test mail',
        text: 'testTESTtest'
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log('Email sent successfully');
            res.sendStatus(200)
        }
    });

})

module.exports = server;