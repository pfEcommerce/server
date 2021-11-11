const { default: axios } = require('axios');
const { Router } = require('express');
const { Category } = require('../db');
require('dotenv').config();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await Category.findAll()
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
});


module.exports = router;