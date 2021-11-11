const { default: axios } = require('axios');
const { Router } = require('express');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = Router();

// Get general
router.post('/', async (req, res) => {
    const { productId, price, userId, date } = req.body;
    try {
        // Busqueda user
        const user = await User.findOne({
            where: {
                id: userId
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
            date
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
        await less.update({
            stock: --currentStock
        });
        res.status(200).send(newOrder);
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;