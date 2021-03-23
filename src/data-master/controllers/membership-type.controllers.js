'use strict';

const MembershipType = require('../models/membership-type.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})

exports.showAll = (request, response)=>{
    let filter = request.body;
    let strFilter = "";
    if(Object.keys(filter).length > 0) {
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter += `AND name like '%${filter.name}%'` :  strFilter += `name like '%${filter.name}%'`
        if(filter.price !== undefined) strFilter.length > 0 ? strFilter += `AND price like '%${filter.price}%'` :  strFilter += `price like '%${filter.price}%'`
        if(filter.duration !== undefined) strFilter.length > 0 ? strFilter += `AND duration like '%${filter.duration}%'` :  strFilter += `city like '%${filter.duration}%'`
        if(filter.status !== undefined) strFilter.length > 0 ? strFilter += `AND status like '%${filter.status}%'` :  strFilter += `status like '%${filter.status}%'`  
    }
    MembershipType.showAll(strFilter, (err, data)=> 
    {   
        data.length > 0 ? successMessage(response, data) : errMessage(response, "Membership Type data not found")   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String defined")
    if(receivedBody.price === undefined) return errMessage(response, "Price must be String defined")
    if(receivedBody.duration === undefined) return errMessage(response, "Duration must be String defined")
    if(receivedBody.status === undefined) return errMessage(response, "Status must be Integer defined")
    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")

    //SEND DATA TO MODELS
    const newMembershipType = new MembershipType(receivedBody)
    MembershipType.create(newMembershipType, (err, data)=>{
        err ? errMessage(response, err) : successMessage(response, {message:"Membership Type added successfully!"})
    })
}

exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    MembershipType.findById(id, function(err, data) {
        err ? errMessage(response, err) : successMessage(response, data)
    });
};

exports.update = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String defined")
    if(receivedBody.price === undefined) return errMessage(response, "Price must be Number defined")
    if(receivedBody.duration === undefined) return errMessage(response, "Duration must be Number defined")
    if(receivedBody.status === undefined) return errMessage(response, "Status must be Integer defined")

    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")
    
    //SEND DATA TO MODELS
    const newData = new MembershipType(receivedBody)
    MembershipType.update(request.params.id, newData, (err, data)=>{
        err ? errMessage(response, err.sqlMessage) : successMessage(response,{message:"Membership Type successfully updated!"})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    MembershipType.delete(id, function(err) {
        err ? errMessage(response, err.sqlMessage) : successMessage(response,{message:"Membership Type successfully deleted!"})    });
};


