const { default: axios } = require('axios');
const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { Order, User } = require('../db');
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-2712597573538994-111618-3fb27258b7ef3c349c8d397ca01d3f1f-292126785'
}); 


router.post('/:userEmail', async (req, res) => {
   
    const { userEmail } = req.params
    const { transaction_amount, token, description, installments, payment_method_id, issuer_id, payer } = req.body

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
    console.log(finalOrders)
    const preference = {
        items: [
            {
               title: finalOrders.title,
               unit_price: finalOrders[0].unit_price,
               quantity: 1
            }
        ]
    }
    
    let acc = 0
    dataOrders.forEach(e => acc = acc + Number.parseFloat(e.dataValues.price))
    console.log(acc)
    const payment_data = {
        transaction_amount: acc,
        token,
        description: 'payment',
        installments,
        payment_method_id,
        issuer_id,
        payer
    }
    mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(response.body)
        res.json({
            id: response.body.id,
            sandbox_init_point: response.body.sandbox_init_point
        });
    }).catch(function(error){
        console.log(error)
    });
    
})

router.get('/feedback', function(req, res) {

	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});



module.exports = router;

