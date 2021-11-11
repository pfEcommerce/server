require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
}); 

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Product, Order, User, Opinion } = sequelize.models;


// Uno a uno
// Usuario con un producto
// Añade userId a la table de product
// User.hasOne(Product, as:"products", foreingKey:"owner_id")
// El producto pertenece al usuario, añade userId a la tabla product
// Product.belongsTo(User, as:"owner, foreingKey:"owner_id"")

// Uno a N
// User va a tener muchos productos
// Se añade una clave userId a la tabla Product
// User.hasMany(Product, {as:'productos', foreingKey:"product_id"})
// Se añade una clave userId a la tabla Product
// Product.belongsTo(User, {as:'owner', foreingKey:"product_id"})

// N a N
// Crea nueva tabla llamada user_products
// User.belongsToMany(Product, {through: "user_products"})
// Product.belongsToMany(User, {through: "user_products"})

Product.belongsToMany(Category, {through: 'product_category', timestamps: false });
Category.belongsToMany(Product, {through: 'product_category', timestamps: false });

Product.hasMany(Order);
Order.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Opinion);
Opinion.belongsTo(User);

Product.hasMany(Opinion);
Opinion.belongsTo(Product);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};