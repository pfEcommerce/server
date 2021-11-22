const { default: axios } = require('axios');
const { Product, Category, Order, User } = require('../db');
require('dotenv').config();
const router = require('express').Router();


router.post('/:email', async (req, res) => {
    const email = req.params.email;
    const { price, id } = req.body;
   
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
        
        
        // New Order
        const newOrder = await Order.create({
            price,
        });
        
        await newOrder.setProduct(searchProduct);
        await newOrder.setUser(user);
        
        const less = await Product.findOne({
            where: {
                id
            }
        });
        if(newOrder){
            await newOrder.update({
                status: 'created'
            })
        } 
        
        
        let currentStock = await less.decrement('stock',{by:1})
        let currentSolds = await less.increment('solds',{by:1}) 
        // Relaciones
        // Resta de stock
        res.status(200).send(newOrder);
        
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;