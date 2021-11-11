const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },      
        email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            },
            unique: true,
            primaryKey:true,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        roleAdmin: {
            type: DataTypes.BOOLEAN,
            default: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true,
        },
        photo: {
            type: DataTypes.TEXT,
            default: '',
        }
    });
};