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

server.post('/addCategory', async (req, res) => {
    const { name } = req.body;
    // console.log(name);
    try {
        const findDuplicate = await Category.findAll({
            where: {
                name: name,
            },
        });
        if (findDuplicate.length !== 0) {
            res.send("Ya existe esa categoría");
        } else {
            await Category.create({
                name: name,
            });
            res.send("Categoría Creada").status(200);
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = server;