const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = Router();

router.post('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    const { price, productId } = req.body;
    try {
        // Busqueda user
        const user = await User.findOne({
            where: {
                email: userEmail
            }
        });
        // Busqueda product
        const searchProduct = await Product.findOne({
            where: {
                id: productId
            }
        });
        // New Order
        const newOrder = await Order.create({
            price,
        });
        const less = await Product.findOne({
            where: {
                id: productId
            }
        });
        let currentStock = await less.increment('stock',{by:1})
        let currentSolds = await less.increment('solds',{by:1})
        // Relaciones
        await newOrder.setProduct(searchProduct);
        await newOrder.setUser(user);
        // Resta de stock
        res.status(200).send(newOrder);
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;