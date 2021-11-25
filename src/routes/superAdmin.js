const { default: axios } = require('axios');
const { User } = require('../db');
require('dotenv').config();
const server = require('express').Router();


server.get('/', async (req, res) => {
    try {
        const data = await User.findAll({
            where: {
                roleAdmin: true
            }
        })
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(400).send('Wrong message')
        }
    } catch (error) {
        console.log(error);
    }
});

server.put('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const { solicitud } = req.body;
    try {
        const data = await User.findOne({
            where: {
                email: userEmail
            }
        });
        if (data) {
            if (solicitud === 'ADD_ADMIN_REQUEST') {
                const updatedData = await data.update({roleAdmin:true});
                return res.status(200).json(updatedData);
            };
            if (solicitud === 'DEL_ADMIN_REQUEST') {
                const updatedData = await data.update({roleAdmin:false});
                return res.status(200).json(updatedData);
            };
        }
        else {
            return res.status(400).send('Wrong user');
        };
    }
    catch (err) {
        console.log(err)
    };
});

module.exports = server;