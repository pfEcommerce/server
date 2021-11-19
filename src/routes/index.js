
const { User } = require('../db');
require('dotenv').config();
const server = require('express').Router();

const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');
const users = require('./user');
const opinions = require('./opinions');

server.use('/products', products);
server.use('/categories', categories);
server.use('/orders', orders);
server.use('/users', users);
server.use('/opinions', opinions);


module.exports = server;