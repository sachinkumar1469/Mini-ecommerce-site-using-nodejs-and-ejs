const Sequelize = require('sequelize');
const sequelize = require('../utils/database_sql');

const OrderItems = sequelize.define('orderItems',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    qunatity:Sequelize.DataTypes.INTEGER,
},
{timestamps:false})

module.exports = OrderItems;