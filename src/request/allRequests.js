const { apiCat } = require('./categories');
const { apiProduct } = require('./products');

const allData = async () => {
    const cats = await apiCat();
    const prods = await apiProduct();
    return cats.concat(prods)
};

module.exports = { allData }