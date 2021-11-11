const server = require('express').Router();
const { User } = require('../db');
require('dotenv').config();

server.get('/', async (req, res) => {
    try {
        res.send('Hello')
    } catch (err) {
        console.log(err)
    }
});

module.exports = server;