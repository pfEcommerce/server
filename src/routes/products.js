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
                    attributes: ['content', 'revRating','name']}
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
                attributes: ['content', 'revRating','name']}
                ]
        });
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});

// Post de producto
server.post('/', async (req, res) => {
    const { name, released, image, price, stock, description, categories } = req.body;
    try {
        const created = await Product.create({
            name,
            released,
            image,  
            price, 
            stock,  
            description, 
        });
        categories.forEach(async e => {
            const categoria = await Category.findOne({
                where: {
                    name: e
                }
            });
            categoria.addProducts(created);
        });
        res.status(200).json(created)
    }
    catch (err) {
        console.error(err.message)
    };
});

// Remove Product
server.put('/:prod', async (req, res) => {
    const prod = req.params.prod;
    try {
        const find = await Product.findOne({
            where: {
                id: prod
            }
        });
        if (find && find.isActive) {
            await find.update({isActive: false});
            await find.save();
            res.status(200).json(find);
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        console.error(error.message);
    }
});


module.exports = server;