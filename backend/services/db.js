const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"webappcloud"
});

connection.connect((error)=>{
    if (error) throw error;
    console.log("connected")
});

module.exports = connection;

