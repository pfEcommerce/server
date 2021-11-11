const { Router } = require('express');
const { User } = require('../db');
require('dotenv').config();
const router = Router();

const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');
const users = require('./user');
const opinions = require('./opinions');

router.use('/products', products);
router.use('/categories', categories);
router.use('/orders', orders);
router.use('/users', users);
router.use('/opinions', opinions);


module.exports = router;