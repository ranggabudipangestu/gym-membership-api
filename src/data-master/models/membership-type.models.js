'use strict';
const conn = require('../../../config/dbconfig')

//creating Membership Type object
const MembershipType = function(membershipType){
    this.name = membershipType.name
    this.price = membershipType.price
    this.duration = membershipType.duration
    this.status = membershipType.status ? membershipType.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

MembershipType.create = (data, result)=>{
    conn.query(`insert into membership_type set?`, data, (err, response)=> err ? result(err, null) : result(null, response.insertId))
}

MembershipType.findById = (id, result)=>{
    conn.query(`select * from membership_type where id=${id}`, (err, res)=> err ? result(err, null) : result(null, res))
}

MembershipType.showAll = (filter, result)=>{
    let sqlCommand = filter.length === 0 ? `select * from membership_type` : `select * from membership_type WHERE ${filter}`
    conn.query(sqlCommand, (err, res)=> err ? result(err, null) : result(null, res))
}

MembershipType.update = function(id, data, result){
    conn.query(
        "UPDATE membership_type SET name=?, price=?, duration=?, status=?, updated_date=? WHERE id = ?", 
        [data.name, data.price, data.duration, data.status, data.updated_date, id], 
        (err, res)=> err ? result(err, null) : result(null, res))  
};

MembershipType.delete = (id, result)=>{
    conn.query(
        `delete from membership_type where id=?`,id, 
        (err, res)=>err ? result(err, null) : result(null, res.insertId))
}

module.exports = MembershipType