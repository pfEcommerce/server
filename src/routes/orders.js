const { default: axios } = require('axios');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const server = require('express').Router();
const { Op } = require('sequelize')

server.post('/', async (req, res) => {
    const email = req.body.data.email;
    const price = req.body.data.price;
    const productsId = req.body.data.productId 
    console.log(req.body)
    try {
        // Busqueda user
        const user = await User.findOne({
            where: {
                email,
            }
        });
        // New Order
        const newOrder = await Order.create({
            price,
            idProduct: productsId
        });

        await newOrder.setUser(user);
        //Si los encuentra, saca uno del stock y sube uno las ventas
        const less = await Product.findAll({
           where: {
               idApi: {[Op.in]: [productsId]}
            }
        }); 
        
        const stockDecrement = await less.decrement('stock',{by:1})
        const soldsIncrement = await less.increment('solds',{by:1})
        res.status(200).send('Order Created');
    }
    catch (err) {
        console.log(err)
    }

    server.get('/', async (req, res) => {
        try{
            const allOrders = await Order.findAll();
            res.status(200).json(allOrders);
        }
        catch (err) {
            console.log(err)
        }
    });
});

module.exports = server;