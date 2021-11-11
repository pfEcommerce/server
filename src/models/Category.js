const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idApi: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};