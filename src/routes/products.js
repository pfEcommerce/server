const { default: axios } = require('axios');
const { Product, Category, Opinion } = require('../db');
require('dotenv').config();
const { Op } = require('sequelize')
const server = require('express').Router();


// Get general
server.get('/', async (req, res) => {
    try {
        if (!req.query.name) {
            const data = await Product.findAll({
                include: [
                    {model: Category,
                    attributes: ['name']},
                    {model: Opinion, 
                    attributes: ['content', 'revRating','name',"userEmail"]}
                ]
            })
            res.status(200).json(data)
        }
        else {
            const gameBd = await Product.findAll({
                where: {name: {[Op.iLike]: '%' + req.query.name + '%'}}
            });
            let private = gameBd.map(p => 
                p.dataValues
            );
            res.status(200).json(private)
        }
    }
    catch (err) {
        console.log(err)
    }
});

// Product especifico
server.get('/:id', async (req, res) => {
    const paramsId = req.params.id;
    try {
        const data = await Product.findOne({
            where: {
                id: paramsId
            }, 
            include: [
                {model: Category,
                attributes: ['name']},
                {model: Opinion, 
                attributes: ['content', 'revRating','name',"userEmail"]}
                ]
        });
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});



module.exports = server;