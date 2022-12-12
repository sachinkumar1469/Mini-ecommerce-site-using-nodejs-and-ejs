const sequelize = require('../utils/database');
const {DataTypes} = require('sequelize');

const User = sequelize.define('Users',{
    id:{
        type:DataTypes.STRING,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:DataTypes.STRING,
    email:DataTypes.STRING,
});

module.exports = User;