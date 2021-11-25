const { default: axios } = require('axios');
const { Wish, User, Product } = require('../db');
require('dotenv').config();
const server = require('express').Router();


// Get wishes
server.get('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try {
        const data = await User.findOne({
            where: {
                email: userEmail
            }, include: [
                {model: Wish}
            ] 
        });
        res.json(data)
    }
    catch (err) {
        console.log(err)
    };
});

server.post('/:email', async (req, res) => {
    const email = req.params.email;
    console.log(email)
    const {id} = req.body
    try {
        // Busqueda user
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        // Busqueda product
        const searchProduct = await Product.findOne({
            where: {
                id
            }
        });
        if (!searchProduct || !user) {
            return res.status(400).send('Failed request')
        }
        // New Order
        const newWish = await Wish.create();
        await newWish.setProduct(searchProduct);
        await newWish.setUser(user);
        res.status(200).send(newWish);
    }
    catch (err) {
        console.log(err)
    }
});


module.exports = server;