'use strict';

const Member = require('../models/member.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})
const validation=(response, data)=>{
    //if body is empty
    if(data.constructor === Object && Object.keys(data).length === 0) return errMessage(response, "Please fill all required field")
    //validation of field
    if(data.name === undefined) return errMessage(response, "Name must String Defined")
    if(data.gender === undefined) return errMessage(response, "Gender must Integer Defined")
    if(data.date_of_birth === undefined) return errMessage(response, "Date of Birth must Date Defined")
    if(data.email === undefined) data = {...data, email:""}
    if(data.phone === undefined) data = {...data, phone:""}
    if(data.address === undefined) data = {...data, address:""}
    if(data.city === undefined) data = {...data, city:""}
    if(data.province === undefined) data = {...data, province:""}
    if(data.membership_type === undefined) data = {...data, membership_type:0}
    if(data.joined_date === undefined) return errMessage(response, "Joined Date must Date Defined")
    if(data.expired_date === undefined) data = {...data, expired_date:"1900-01-01"}
    if(data.joined_location === undefined) data = {...data, joined_location:0}
    if(data.status === undefined) data = {...data, status:1}
    if(data.trainer_id === undefined) data = {...data, trainer_id:0}
    if(data.created_by === undefined) data = {...data, created_by:0}
    if(data.updated_by === undefined) data = {...data, updated_by:0}
    return data
}


exports.showAll = (request, response)=>{
    let filter = request.query.filter === undefined ? null : request.query.filter;
    const sort = request.query.sort !== undefined ? request.query.sort : ""
    const pageNumber = request.query.pageNumber !== undefined ? request.query.pageNumber : 0
    const rowsPerPage = request.query.rowsPerPage !== undefined ? request.query.rowsPerPage : 0
    
    Member.showData(filter, sort, pageNumber, rowsPerPage, (error, member)=> 
    {  
        member !== null ? successMessage(response, member) : errMessage(response, error)   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    receivedBody = validation(response, receivedBody)
    //send member to models
    const newMember = new Member(receivedBody)
    Member.create(newMember, (error, member)=>{
        error ? errMessage(response, error) : successMessage(response, {message:"Member added successfully!"})
    })
}
exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    let strFilter = id > 0 && JSON.stringify({id})
    Member.showData(strFilter, "", 1, 1, function(error, member) {
        member !== null ? successMessage(response, member): errMessage(response, error) 
    });
};

exports.update = (request, response)=>{
    let receivedBody = request.body;
    receivedBody = validation(response, receivedBody)
    //send member to models
    const updatedMember = new Member(receivedBody)
    Member.update(request.params.id, updatedMember, (error, member)=>{
        error ? errMessage(response, error.sqlMessage) : successMessage(response, {message:"Member successfully updated!"})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    Member.delete(id, function(error) {
        error ? errMessage(response, error.sqlMessage) :successMessage(response, {message:"Member successfully deleted!"})
    });
};


