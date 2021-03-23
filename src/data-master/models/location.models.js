'use strict';
const conn = require('../../../config/dbconfig')

//creating Location object
const Location = function(location){
    this.name = location.name
    this.address = location.address
    this.city = location.city
    this.province = location.province
    this.country = location.country
    this.status = location.status ? location.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

Location.create = (data, result)=>{
    conn.query(`insert into location set?`, data, (err, response)=> err ? result(err, null) : result(null, response.insertId))
}

Location.findById = (id, result)=>{
    conn.query(`select * from location where id=${id}`, (err, res)=> err ? result(err, null) : result(null, res))
}

Location.showAll = (filter, result)=>{
    let sqlCommand = filter.length === 0 ? `select * from location` : `select * from location WHERE ${filter}`
    conn.query(sqlCommand, (err, res)=> err ? result(err, null) : result(null, res))
}

Location.update = function(id, data, result){
    conn.query(
        "UPDATE location SET name=?, address=?, city=?, province=?, country=?, status=?, updated_date=? WHERE id = ?", 
        [data.name, data.address, data.city, data.province, data.country, data.status, data.updated_date, id], 
        (err, res)=> err ? result(err, null) : result(null, res))  
};

Location.delete = (id, result)=>{
    conn.query(
        `delete from location where id=?`,id, 
        (err, res)=>err ? result(err, null) : result(null, res.insertId))
}

module.exports = Location