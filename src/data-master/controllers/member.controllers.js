'use strict';

const Member = require('../models/member.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})

exports.showAll = (request, response)=>{
    let filter = request.query.filter === undefined ? null : request.query.filter;
    const sort = request.query.sort !== undefined ? request.query.sort : ""
    const pageNumber = request.query.sort !== undefined ? request.query.pageNumber : 1
    const rowsPerPage = request.query.rowsPerPage !== undefined ? request.query.rowsPerPage : 1
    
    Member.showData(filter, sort, pageNumber, rowsPerPage, (error, member)=> 
    {  
        member !== null ? successMessage(response, member) : errMessage(response, error)   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    //if body is empty
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //validation of field
    if(receivedBody.name === undefined) return errMessage(response, "Name must be filled")
    if(receivedBody.email === undefined) receivedBody = {...receivedBody, email:""}
    if(receivedBody.phone === undefined) receivedBody = {...receivedBody, phone:""}
    if(receivedBody.address === undefined) receivedBody = {...receivedBody, address:""}
    if(receivedBody.status === undefined) receivedBody = {...receivedBody, status:1}
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
        error ? errMessage(response, error) : successMessage(response, member)
    });
};

exports.update = (request, response)=>{
    let receivedBody = request.body;
    //if body is empty
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) errMessage(response, "Please fill all required field")
    //validation of field
    if(receivedBody.name === undefined) return errMessage(response, "Name must be filled")
    if(receivedBody.email === undefined) receivedBody = {...receivedBody, email:""}
    if(receivedBody.phone === undefined) receivedBody = {...receivedBody, phone:""}
    if(receivedBody.address === undefined) receivedBody = {...receivedBody, address:""}
    if(receivedBody.salary === undefined || typeof(receivedBody.salary) !== Number) receivedBody = {...receivedBody, salary:0}
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


