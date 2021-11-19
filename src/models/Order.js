const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        price: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        paymentId: {
            type: DataTypes.TEXT,
            allowNull: true,
        }, 
        status: {
            type: DataTypes.ENUM('pending', 'completed'),
            defaultValue: 'pending'
        }
    });
};