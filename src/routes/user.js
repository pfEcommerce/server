const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = Router();

// Create user
router.post('/login', async (req, res) => {
    const { picture, email, sub, family_name, given_name, nickname } = req.body;
    const isGoogle = sub.slice(0, 6);
    //console.log(req.body)
    try {
        if (isGoogle === 'google') {
            const userGoogle = await User.findOne({
                where: {
                    email: email
                }
            });
            if (userGoogle) {
                //console.log('search succes')
                res.status(200).json(userGoogle)
            } else {
                const createUser = await User.create({
                    firstName: given_name,
                    lastName: family_name,
                    photo: picture,
                    email: email,
                    isGoogle: true,
                });
                //console.log('created succes')
                res.status(200).json(createUser)
            };
        } else {
            const userAuth = await User.findOne({
                where: {
                    email: email
                }
            });
            if (userAuth) {
                //console.log('search auth0 succes')
                res.status(200).json(userAuth)
            } else {
                const createAuthUser = await User.create({
                    firstName: nickname,
                    photo: picture,
                    email: email,
                });
                //console.log('created auth0 succes')
                res.status(200).json(createAuthUser)
            };
        };
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;