'use strict';
const conn = require('../../../config/dbconfig')

//creating Trainer object
const Trainer = function(Trainer){
    this.name = Trainer.name
    this.email = Trainer.email
    this.phone = Trainer.phone
    this.address = Trainer.address
    this.salary = Trainer.salary
    this.status = Trainer.status ? Trainer.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

Trainer.create = (trainer, result)=>{
    conn.query(`insert into Trainer set?`, trainer, (error, response)=> error ? result(error, null) : result(null, response.insertId))
}

Trainer.findById = (id, result)=>{
    conn.query(`select * from Trainer where id=${id}`, (error, response)=> error ? result(error, null) : result(null, response))
}

Trainer.showAll = (filter, result)=>{
    let sqlCommand = filter.length === 0 ? `select * from Trainer` : `select * from Trainer WHERE ${filter}`
    conn.query(sqlCommand, (error, response)=> error ? result(error, null) : result(null, response))
}

Trainer.update = function(id, trainer, result){
    conn.query(
    "UPDATE Trainer SET name=?, email=?, phone=?, salary=?, status=?, updated_date=? WHERE id = ?", 
    [trainer.name, trainer.email, trainer.phone, trainer.salary, trainer.status, trainer.updated_date, id], 
    (error, response)=> error ? result(error, null) : result(null, response))  
};

Trainer.delete = (id, result)=>{
    conn.query(`delete from Trainer where id=?`,id, (error, response)=>{
        error ? result(error, null) : result(null, response.insertId)
    })
}

module.exports = Trainer