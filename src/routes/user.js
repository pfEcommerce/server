const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = Router();

// Create user
router.post('/', async (req, res) => {
    const { firstName, lastName, phone, email, password, photo } = req.body;
    try {
        const user = await User.create({
            firstName,
            lastName, 
            phone, 
            email, 
            password, 
            photo
        })
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;