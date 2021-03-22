'use strict';
const conn = require('../../config/db.config')

//creating Trainer object
const Trainer = function(Trainer){
    this.code = Trainer.code
    this.name = Trainer.name
    this.email = Trainer.email
    this.phone = Trainer.phone
    this.address = Trainer.address
    this.salary = Trainer.salary
    this.status = Trainer.status ? Trainer.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

Trainer.create = (data, result)=>{
    conn.query(`insert into Trainer set?`,data, (err, response)=> err ? result(err, null) : result(null, response.insertId))
}

Trainer.findById = (id, result)=>{
    conn.query(`select * from Trainer where id=${id}`, (err, res)=> err ? result(err, null) : result(null, res))
}

Trainer.showAll = (filter, result)=>{
    let strFilter = "";
    if(filter !== null){
        if(filter.code !== undefined ) strFilter.length > 0 ? strFilter += `AND code like '%${filter.code}%'` :  strFilter += `code like '%${filter.code}%'`
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter += `AND name like '%${filter.name}%'` :  strFilter += `name like '%${filter.name}%'`
        if(filter.email !== undefined) strFilter.length > 0 ? strFilter += `AND email like '%${filter.email}%'` :  strFilter += `email like '%${filter.email}%'`
        if(filter.phone !== undefined) strFilter.length > 0 ? strFilter += `AND phone like '%${filter.phone}%'` :  strFilter += `phone like '%${filter.phone}%'`
    }
    let sqlCommand = strFilter.length === 0 ? `select * from Trainer` : `select * from Trainer WHERE ${strFilter}`
    conn.query(sqlCommand, (err, res)=> err ? result(err, null) : result(null, res))
}

Trainer.update = function(id, data, result){
    conn.query("UPDATE Trainer SET code=?,name=?,email=?,phone=?,salary=?, updated_date=? WHERE id = ?", [data.code,data.name,data.email,data.phone,data.salary, data.updated_date, id], 
    (err, res)=> err ? result(err, null) : result(null, res))  
};

Trainer.delete = (id, result)=>{
    conn.query(`delete from Trainer where id=?`,id, (err, res)=>{
        err ? result(err, null) : result(null, res.insertId)
    })
}

module.exports = Trainer