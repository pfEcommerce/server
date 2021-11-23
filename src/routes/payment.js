
const stripe = require('stripe')('sk_test_51Jz6qgJHBteWHI6WC9CLRjcvKoppQ07ydww3aWsizNczhW8C8dgDHuERgKV62qpDg5JtNP9sqymiIBpyT6jyDcX700u4DJ6LoI');
const express = require('express');
const server = express();

server.post('/', async (req, res) => {
    const { data } = req.body;
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your games',
            },
            unit_amount: data,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://localhost:3000',
      cancel_url: 'https://localhost:3000/payment',
    });
  
    res.status(303).redirect(session.url);
  });

module.exports = server