
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
  router.use(session(
    {
      name: 'sid',
      secret:'secret', // Debería estar en un archivo de environment
      resave:false,
      saveUninitialized:false,
      cookie:{
        maxAge: 1000 * 60 * 60 * 2 // Está en milisegundos --> 2hs
      }
    }
  ));
  


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