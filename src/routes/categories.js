const { default: axios } = require('axios');
const { Router } = require('express');
const { Category } = require('../db');
require('dotenv').config();
const router = Router();

// Get categorias
router.get('/', async (req, res) => {
    try {
        const data = await Category.findAll()
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});

// Create category
router.post('/:cat', async (req, res) => {
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


module.exports = router;