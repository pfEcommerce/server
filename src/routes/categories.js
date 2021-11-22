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

// Create category
server.post('/:cat', async (req, res) => {
    const cat = req.params.cat;
    try {
        const findCreated = await Category.findOrCreate({
            where: {
                name: cat
            }
        })
        res.status(200).json(findCreated);
    } catch (error) {
        console.error(error.message);
    }
});

// Remove category
server.put('/:cat', async (req, res) => {
    const cat = req.params.cat;
    try {
        const find = await Category.findOne({
            where: {
                name: cat
            }
        });
        if (find && find.isActive) {
            await find.update({isActive: false});
            await find.save();
            res.status(200).json(find);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.error(error.message);
    }
});


module.exports = server;