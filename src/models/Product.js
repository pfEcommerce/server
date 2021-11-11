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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true
        }
    });
};