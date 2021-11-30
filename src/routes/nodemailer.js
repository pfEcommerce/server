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

    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    });

    let mailDetails = {
        from: EMAIL,
        to: EMAIL,
        subject: 'Test mail',
        text: 'Node.js testing mail'
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.sendStatus(200)
        }
    });
})

module.exports = server;