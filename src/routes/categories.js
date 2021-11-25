const { default: axios } = require('axios');
const { Category } = require('../db');
require('dotenv').config();
const server = require('express').Router();


// Get categorias
server.get('/', async (req, res) => {
    try {
        const data = await Category.findAll()
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});


module.exports = server;