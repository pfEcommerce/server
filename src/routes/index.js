const { Router } = require('express');
const { User } = require('../db');
require('dotenv').config();
const router = Router();

const products = require('./products');
const categories = require('./categories');

router.use('/products', products);
router.use('/categories', categories);


module.exports = router;