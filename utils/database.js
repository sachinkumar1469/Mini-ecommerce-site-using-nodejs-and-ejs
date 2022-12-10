const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",        // Give access to database server
    database:"node_tutorial",            // Define to which database u want access
    password:"Sachin@123"   
});

module.exports = pool.promise();