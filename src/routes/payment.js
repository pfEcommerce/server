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
    console.log(finalOrders)
    const preference = {
        items: [
            {
               title: finalOrders.title,
               unit_price: acc,
               quantity: 1
            },
        
        ],
        back_urls: {
            "success": "http://localhost:3000/payment",
            "failure": "http://localhost:3000/payment",
            "pending": "http://www.pending.com"
        },
    }
    
    
   
    mercadopago.preferences.create(preference)
    .then(function(response){
        dataOrders.forEach(async e => await e.update({
            paymentId: response.body.id
        }))
        res.json({
            id: response.body.id
        })
    }).catch(function(error){
        console.log(error)
    });
    
})

router.get('/:paymentId', async (req, res) => {
    const { paymentId } = req.params
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });

    const dataOrders = await Order.findAll({
        where: {
            userEmail: user.email,
            paymentId
        }
    });

    if(dataOrders){
        res.send(dataOrders.paymentId)
    } else {
        res.send('Not found')
    }
   
})

router.get('/mypurchases', function(req, res) {
    const { transaction_amount, token, description, installments, payment_method_id, issuer_id, payer } = req.body

    const payment_data = {
        token,
        description: 'payment',
        installments,
        payment_method_id,
        issuer_id,
        payer
    }
    res.status(200).json(payment_data)
	
});



module.exports = router;

