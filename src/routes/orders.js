const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = Router();

// Get general
router.post('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    const { productId, price } = req.body;
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
        // Relaciones
        await newOrder.setProduct(searchProduct);
        await newOrder.setUser(user);
        // Resta de stock
        const less = await Product.findOne({
            where: {
                id: productId
            }
        });
        let currentStock = less.dataValues.stock;
        let currentSolds = less.dataValues.solds;
        await less.update({
            stock: --currentStock
        });
        await less.update({
            solds: ++currentSolds
        });
        res.status(200).send(newOrder);
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;