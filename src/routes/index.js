const { Router } = require('express');
const { User } = require('../db');
require('dotenv').config();
const router = Router();

const products = require('./products');

router.use('/products', products);


module.exports = router;