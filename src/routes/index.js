
const { User } = require('../db');
require('dotenv').config();
const { Router } = require('express');
const server = Router();
const cors = require('cors');
const session = require('express-session');


 server.use(
    cors({
      origin: '*',
      credentials: true,
    })
  ); 
const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');
const users = require('./user');
const opinions = require('./opinions');
const payment = require('./payment');

server.use('/products', products);
server.use('/categories', categories);
server.use('/orders', orders);
server.use('/users', users);
server.use('/opinions', opinions);
server.use('/payment', payment);


module.exports = server;