const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('opinion', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        revRating: {
            type: DataTypes.ENUM('1','2','3','4','5'),
            allowNull: false
        }
    });
};