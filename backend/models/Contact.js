const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Contact = sequelize.define('Contact', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prestation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creneau: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'contacts',
    timestamps: true
});

module.exports = Contact;
