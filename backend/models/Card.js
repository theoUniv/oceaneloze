const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Card = sequelize.define('Card', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        // 'portfolio' ou 'prestation'
        type: DataTypes.STRING,
        allowNull: true
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Nouveaux champs pour affiner Portfolio et Prestations
    type: {
        // 'image' ou 'quote' pour le portfolio
        type: DataTypes.STRING,
        defaultValue: 'image'
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    features: {
        // Pour stocker une liste (ex: JSON stringifié)
        type: DataTypes.TEXT,
        allowNull: true
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'cards',
    timestamps: true
});

module.exports = Card;
