const Sequelize = require('sequelize');
const sequelize = require('../utils/database_sql');

const Cart = sequelize.define('cart',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    }
})


exports.Cart = Cart;