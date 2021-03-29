// source : https://medium.com/wenchin-rolls-around/example-of-using-transactions-with-async-await-via-mysql-connection-pool-9a37092f226f

const mysql = require("mysql");
let dbConfig = {
    connectionLimit: 10, // default 10
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "gym-membership"
  };
const pool = mysql.createPool(dbConfig);
const connection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) reject(err);
        console.log("MySQL pool connected: threadId " + connection.threadId);
        
        const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
                connection.query(sql, binding, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        };
        const release = () => {
            return new Promise((resolve, reject) => {
            if (err) reject(err);
            console.log("MySQL pool released: threadId " + connection.threadId);
            resolve(connection.release());
            });
        };
        resolve({ query, release });
        });
   });
 };
module.exports = { pool, connection };