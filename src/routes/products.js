const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category } = require('../db');
require('dotenv').config();
const router = Router();

router.get('/', async (req, res) => {
    const data = await Product.findAll({
        include: {
            model: Category,
            attributes: ['name']
        }
    })
    res.status(200).json(data)
});


module.exports = router;