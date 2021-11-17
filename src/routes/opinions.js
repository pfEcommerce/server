const { default: axios } = require('axios');
const { Router } = require('express');
const { Opinion, Product, User } = require('../db');
require('dotenv').config();
const router = Router();

// Post opinion
router.post('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    const { content, revRating, prodId } = req.body;
    
    try {
        const searchUser = await User.findOne({
            where: {
                email: userEmail
            }
        });
        const searchProduct = await Product.findOne({
            where: {
                id: prodId
            }
        });
        
        if (searchUser && searchProduct){
            const generateOpinion = await Opinion.create({
                content,
                revRating
            });
            await searchUser.addOpinion(generateOpinion);
            await searchProduct.addOpinion(generateOpinion);
            await generateOpinion.setProduct(searchProduct);
            res.status(200).send('Success');
        } else {
            res.status(400).send('Wrong email')
        }
    }
    catch (err) {
        console.error(err.message)
    };
});


module.exports = router;