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
    
    
    const preference = {
        items: [
            dataOrders.forEach(e => ({
                title: e.dataValues.productId,
                unit_price: Number.parseFloat(e.dataValues.price),
            }))
        ],
        back_urls: {
            success: `${process.env.DOMAIN_URL}/success`,
            pending: `${process.env.DOMAIN_URL}/pending`,
            failure: `${process.env.DOMAIN_URL}/rejected`,
        },
        auto_return: 'approved',
    }
    let acc = 0
    dataOrders.forEach(e => acc = acc + Number.parseFloat(e.dataValues.price))
    const payment_data = {
        transaction_amount: acc,
        token,
        description: 'payment',
        installments,
        payment_method_id,
        issuer_id,
        payer
    }
    mercadopago.payment
        .save(payment_data)
        .then((r) => {
        
            return res.status(r.status).json({
                status: r.body.status,
                status_detail: r.body.detail,
                id: r.body.id
            })
        })


    res.send('success')
})

router.get('/feedback', function(req, res) {

	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});



module.exports = router;

