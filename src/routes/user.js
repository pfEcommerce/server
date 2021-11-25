const { default: axios } = require('axios');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const server = require('express').Router();



// Create user
server.post('/login', async (req, res) => {
    const { picture, email, sub, family_name, given_name, nickname, testGoogle, roleAdmin, loader, phone } = req.body;
    const isGoogle = sub?sub.slice(0, 6):testGoogle === true?'google':null;
    //console.log(req.body)
    try {
        if (isGoogle === 'google') {
            const userGoogle = await User.findOne({
                where: {
                    email: email
                }, include : [
                    {model: Order, include: [{model:Product}]}
                ]
            });
            if (userGoogle) {
                console.log('search succes')
                res.status(200).json(userGoogle)
            } else {
                const createUser = await User.create({
                    firstName: given_name,
                    lastName: family_name,
                    photo: picture,
                    email: email,
                    isGoogle: true,
                    roleAdmin: roleAdmin?roleAdmin:false
                });
                console.log('created succes')
                const searchCreatedUser = await User.findOne({
                    where: {
                        email: email
                    }, include : [
                        {model: Order, include: [{model:Product}]}
                    ]
                });
                res.status(200).json(searchCreatedUser)
            };
        } else {
            const userAuth = await User.findOne({
                where: {
                    email: email
                }, include : [
                    {model: Order, include: [{model:Product}]}
                ]
            });
            if (userAuth) {
                console.log('search auth0 succes')
                res.status(200).json(userAuth)
            } else {
                if (loader) {
                    const createAuthUser = await User.create({
                        firstName: given_name,
                        lastName: family_name,
                        email: email,
                        phone: phone,
                        roleAdmin: roleAdmin
                    });
                    console.log('created auth0 succes')
                    const searchCreatedUser = await User.findOne({
                        where: {
                            email: email
                        }, include : [
                            {model: Order, include: [{model:Product}]}
                        ]
                    });
                    res.status(200).json(searchCreatedUser)
                }
                else{
                    const createAuthUser = await User.create({
                        firstName: nickname,
                        photo: picture,
                        email: email,
                    });
                    console.log('created auth0 succes')
                    const searchCreatedUser = await User.findOne({
                        where: {
                            email: email
                        }, include : [
                            {model: Order, include: [{model:Product}]}
                        ]
                    });
                    res.status(200).json(searchCreatedUser)
                }
            };
        };
    } catch (error) {
        console.log(error);
    };
});



module.exports = server;