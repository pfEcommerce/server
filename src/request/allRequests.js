const { apiCat } = require('./categories');
const { apiProduct } = require('./products');
const { Product, Category } = require('../db');

const allData = async () => {
    const prods = await apiProduct();
    const cats = await apiCat();
    return
};

module.exports = { allData }