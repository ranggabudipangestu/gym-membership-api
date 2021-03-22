'use strict';
const mysql = require('mysql')
const dbConn = mysql.createConnection({host:'localhost', user:'root', password:'root', database:'gym-membership'});
dbConn.connect((err)=> {
    if(err) throw err
    console.log("Database Connected")
})

module.exports = dbConn