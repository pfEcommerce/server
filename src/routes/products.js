const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Opinion } = require('../db');
require('dotenv').config();
const router = Router();

// Get general
router.get('/', async (req, res) => {
    try {
        const data = await Product.findAll({
            include: [
                {model: Category,
                attributes: ['name']},
                {model: Opinion, 
                attributes: ['content', 'revRating']}
            ]
        })
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
});

// Product especifico
router.get('/:id', async (req, res) => {
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
                attributes: ['content', 'revRating']}
                ]
        });
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});

// Post de producto
router.post('/', async (req, res) => {
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
router.put('/:prod', async (req, res) => {
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


module.exports = router;