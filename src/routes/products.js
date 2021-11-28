const { default: axios } = require('axios');
const { Product, Category, Opinion } = require('../db');
require('dotenv').config();
const { Op } = require('sequelize')
const server = require('express').Router();


// Get general
server.get('/', async (req, res) => {
    try {
        if (!req.query.name) {
            const data = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['name']
                    },
                    {
                        model: Opinion,
                        attributes: ['content', 'revRating', 'name', "userEmail"]
                    }
                ]
            })
            res.status(200).json(data)
        }
        else {
            const gameBd = await Product.findAll({
                where: { name: { [Op.iLike]: '%' + req.query.name + '%' } }
            });
            let private = gameBd.map(p =>
                p.dataValues
            );
            res.status(200).json(private)
        }
    }
    catch (err) {
        console.log(err)
    }
});

// Product especifico
server.get('/:id', async (req, res) => {
    const paramsId = req.params.id;
    try {
        const data = await Product.findOne({
            where: {
                id: paramsId
            },
            include: [
                {
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: Opinion,
                    attributes: ['content', 'revRating', 'name', "userEmail"]
                }
            ]
        });
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    };
});

server.post('/addProduct', async (req, res) => {
    let {
        name,
        price,
        stock,
        description,
        image,
        categoryName,
      } = req.body;
    
      if(price < 0 ) return res.json({ error: 'El valor de precio no puede ser menor a cero' })
      if(stock < 0) return res.json({ error: 'El valor de stock no puede ser menor a cero' })
    
      try {
        const [addProduct, created] = await Product.findOrCreate({
          where: {
            name,
            price,
            stock,
            description,
            image
          },
        });
    
        const findCategories = await Category.findAll({
          where: {
            name: {
              [Op.in]: categoryName,
            },
          },
        });
    
        await addProduct.setCategories(findCategories);
    
        return res.json(addProduct);
      } catch (err) {
        console.log(err);
      }
});

module.exports = server;