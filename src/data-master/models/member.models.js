'use strict';
const conn = require('../../../config/dbconfig')
const sql = require('../../libs/mysql.query')

//creating Member object
const Member = function(member){
    this.name = member.name
    this.gender = member.gender
    this.date_of_birth = member.date_of_birth
    this.email = member.email
    this.phone = member.phone
    this.address = member.address
    this.city = member.city
    this.province = member.province
    this.country = member.country
    this.membership_type = member.membership_type
    this.joined_date = member.joined_date
    this.expired_date = member.expired_date
    this.joined_location = member.joined_location
    this.status = member.status
    this.trainer_id = member.trainer_id
    this.created_by = member.created_by
    this.updated_by = member.updated_by
    this.created_date = new Date();
    this.updated_date = new Date();
}

Member.create = (member, result)=>{
    conn.query(`insert into Member set?`, member, (error, response)=> error ? result(error, null) : result(null, response.insertId))
}

Member.showData = (filter=null, sort="", pageNumber="", rowsPerPage="", result)=>{
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
    IFNULL(mt.price,0) AS membership_price, 
    IFNULL(l.name,"") as joined_location_name, 
    IFNULL(l.address,"") AS joined_location_address 
    FROM member m 
    LEFT JOIN membership_type mt ON m.membership_type = mt.id
    LEFT JOIN location l ON m.joined_location = l.id` 
    conn.query(sql.commandSelect(sqlCommand, strFilter, sort, pageNumber, rowsPerPage), 
    (error, response)=> {
        if(error || response.length === 0) return result(error===null ? "Member data Not found":error, null)
        return result(null, response)
    })
}

Member.update = function(id, member, result){
    conn.query(
    `UPDATE Member SET 
    name=?,gender=?,date_of_birth=?,email=?,phone=?,address=?,city=?,province=?, country=?,
    membership_type=?, joined_date=?,expired_date=?,joined_location=?,status=?,trainer_id=?,
    updated_by=?, updated_date=? WHERE id = ?`, 
    [member.name,member.gender,member.date_of_birth,member.email,member.phone, member.address,member.city,member.province, member.country,
    member.membership_type, member.joined_date, member.expired_date, member.joined_location,member.status,member.trainer_id,
    member.updated_by,member.updated_date], 
    (error, response)=> error ? result(error, null) : result(null, response))  
};

Member.delete = (id, result)=>{
    conn.query(`delete from Member where id=?`,id, (error, response)=>{
        error ? result(error, null) : result(null, response.insertId)
    })
}

module.exports = Member