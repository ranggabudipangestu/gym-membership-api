'use strict';
const conn = require('../../../config/dbconfig')

//creating Membership Type object
const Tax = function(tax){
    this.name = tax.name
    this.percentage = tax.percentage
    this.status = tax.status ? tax.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

Tax.create = (tax, result)=>{
    conn.query(`insert into tax set?`, tax, (error, response)=> error ? result(error, null) : result(null, response.insertId))
}

Tax.findById = (id, result)=>{
    conn.query(`select * from tax where id=${id}`, (error, response)=> error ? result(error, null) : result(null, response))
}

Tax.showAll = (filter, result)=>{
    let sqlCommand = filter.length === 0 ? `select * from tax` : `select * from tax WHERE ${filter}`
    conn.query(sqlCommand, (error, response)=> error ? result(error, null) : result(null, response))
}

Tax.update = function(id, tax, result){
    conn.query(
        "UPDATE tax SET name=?, percentage=?, updated_date=? WHERE id = ?", 
        [tax.name, tax.percentage, tax.updated_date, id], 
        (error, response)=> error ? result(error, null) : result(null, response))  
};

Tax.delete = (id, result)=>{
    conn.query(
        `delete from tax where id=?`,id, 
        (error, response)=>error ? result(error, null) : result(null, response.insertId))
}

module.exports = Tax