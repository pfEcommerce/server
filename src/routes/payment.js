const { default: axios } = require('axios');
const { Router, response } = require('express');
require('dotenv').config();
const router = Router();
const { Order, User } = require('../db');
const mercadopago = require('mercadopago');


mercadopago.configure({
    access_token: 'TEST-2712597573538994-111618-3fb27258b7ef3c349c8d397ca01d3f1f-292126785'
}); 


router.post('/', async (req, res) => {
   
    const { data } = req.body
    
    const preference = {
        items: [
            {
               title: 'Your total',
               unit_price: Number(data),
               quantity: 1
            },
        
        ],
      
    }
    
    const response = await mercadopago.preferences.create(preference)
    
    res.status(200).json({
        id: response.body.id
    })
   
})


module.exports = router;

