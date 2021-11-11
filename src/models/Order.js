const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paymentId: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};