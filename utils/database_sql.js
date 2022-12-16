const mysql = require('mysql2');

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('node_tutorial','root','Sachin@123',{
    host:'localhost',
    dialect:'mysql'
})

// Function to test the connection established or not

async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
// testConnection(); Well there is an alternative start the server only when connection to databse estiblished


module.exports = sequelize;