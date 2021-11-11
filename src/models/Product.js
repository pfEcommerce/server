const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        released: {
            type: DataTypes.DATE,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        reviews: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
        },
        idApi: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};