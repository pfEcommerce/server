const { default: axios } = require('axios');
const { Router, response } = require('express');
require('dotenv').config();
const router = Router();
const { Order, User } = require('../db');
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-2712597573538994-111618-3fb27258b7ef3c349c8d397ca01d3f1f-292126785'
}); 


router.post('/:userEmail', async (req, res) => {
   
    const { userEmail } = req.params
    
    
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });
    

    const dataOrders = await Order.findAll({
        where: {
            userEmail: user.email
        }
    });
    
    const finalOrders = dataOrders.map(e => ({
        title: e.productId,
        unit_price: Number.parseFloat(e.dataValues.price),
        quantity: 1
    }))

    let acc = 0
    finalOrders.forEach(e => acc = acc + Number.parseFloat(e.unit_price))
    
    const preference = {
        items: [
            {
               title: 'Your game/s',
               unit_price: acc,
               quantity: 1
            },
        
        ],
      
    }
    
    
    const response = await mercadopago.preferences.create(preference)

    dataOrders.forEach(async e => await e.update({
        paymentId: response.body.id
    }))
        
    res.json(console.log(response.body.id), {
        id: response.body.id
    })
   
})

router.get('/:paymentId', async (req, res) => {
    const { paymentId } = req.params
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });
    console.log(user)
    const dataOrders = await Order.findAll({
        where: {
            userEmail: user.email,
            paymentId
        }
    });

    if(dataOrders){
        res.status(202).send(dataOrders.paymentId)

    } else {
        res.status(404).send('Order not found')
    }
   
})  




module.exports = router;

