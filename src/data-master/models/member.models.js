'use strict';
const conn = require('../../../config/dbconfig')
const sql = require('../../libs/mysql.query')

//creating Member object
const Member = function(member){
    this.name = member.name
    this.gender = member.gender
    this.date_of_birth = member.date_of_birth
    this.phone = member.phone
    this.email = member.email
    this.address = member.address
    this.city = member.city
    this.province = member.province
    this.country = member.country
    this.membership_type = member.membership_type
    this.joined_date = member.joined_date
    this.expired_date = member.expired_date
    this.joined_location = member.joined_location
    this.status = Member.status ? Member.status : 1
    this.created_date = new Date();
    this.updated_date = new Date();
}

Member.create = (member, result)=>{
    conn.query(`insert into Member set?`, member, (error, response)=> error ? result(error, null) : result(null, response.insertId))
}

Member.findById = (id, result)=>{
    conn.query(`select * from Member where id=${id}`, (error, response)=> error ? result(error, null) : result(null, response))
}

Member.showData = (filter, sort="", pageNumber="", rowsPerPage="", result)=>{
    let strFilter = "";
    
    if(filter !== null){
        filter = JSON.parse(filter);
        if(filter.id !== undefined) strFilter.length > 0 ? strFilter += `AND m.id = ${filter.id}` :  strFilter += ` m.id = ${filter.id}`
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter += `AND m.name like '%${filter.name}%'` :  strFilter += `m.name like '%${filter.name}%'`
        if(filter.email !== undefined) strFilter.length > 0 ? strFilter += `AND m.email like '%${filter.email}%'` :  strFilter += `email like '%${filter.email}%'`
        if(filter.phone !== undefined) strFilter.length > 0 ? strFilter += `AND m.phone like '%${filter.phone}%'` :  strFilter += `phone like '%${filter.phone}%'`
        if(filter.address !== undefined) strFilter.length > 0 ? strFilter += `AND m.address like '%${filter.address}%'` :  strFilter += `address like '%${filter.address}%'`
        if(filter.status !== undefined) strFilter.length > 0 ? strFilter += `AND m.status like '%${filter.status}%'` :  strFilter += `status like '%${filter.status}%'`
    }
   

    let sqlCommand = `SELECT m.*, 
    IFNULL(mt.name,"") as membership_name, 
    IFNULL(mt.price,0) AS price_membership, 
    IFNULL(l.name,"") as joined_location_name, 
    IFNULL(l.address,"") AS joined_location_address 
    FROM member m 
    LEFT JOIN membership_type mt ON m.membership_type = mt.id
    LEFT JOIN location l ON m.joined_location = l.id` 
    conn.query(sql.showData(sqlCommand, strFilter, sort, pageNumber, rowsPerPage), result, 
    (error, response)=> {
        if(error || response.length === 0) return result(error, null)
        return result(null, response)
    })
}

Member.update = function(id, member, result){
    conn.query(
    "UPDATE Member SET name=?, email=?, phone=?, salary=?, status=?, updated_date=? WHERE id = ?", 
    [member.name, member.email, member.phone, member.salary, member.status, member.updated_date, id], 
    (error, response)=> error ? result(error, null) : result(null, response))  
};

Member.delete = (id, result)=>{
    conn.query(`delete from Member where id=?`,id, (error, response)=>{
        error ? result(error, null) : result(null, response.insertId)
    })
}

module.exports = Member