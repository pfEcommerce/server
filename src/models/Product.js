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
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        released: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idApi: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imgs: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
        },
        platforms: {
                type: DataTypes.ARRAY(DataTypes.JSON),
                allowNull: true,
        }
        
    });
};