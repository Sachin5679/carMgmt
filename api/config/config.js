const { Sequelize } = require('sequelize');
require('dotenv').config();

//(database name, username, password)
//.env these
const sequelize = new Sequelize(        
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,{
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: console.log,
    }
);

module.exports = sequelize;
