
const { User } = require('../db');
require('dotenv').config();
const { Router } = require('express');
const router = Router();
const cors = require('cors');
const session = require('express-session');


router.use(
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
const wish = require('./wish');

router.use('/products', products);
router.use('/categories', categories);
router.use('/orders', orders);
router.use('/users', users);
router.use('/opinions', opinions);
router.use('/wishes', wish);

module.exports = router;