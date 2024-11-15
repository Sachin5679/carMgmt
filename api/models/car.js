const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Car = sequelize.define('Car', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSONB,  
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSONB,  
    allowNull: true,
  },
});

module.exports = Car;
