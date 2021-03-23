'use strict';

const Location = require('../models/location.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})

exports.showAll = (request, response)=>{
    let filter = request.body;
    let strFilter = "";

    //GENERATE FILTER
    if(Object.keys(filter).length > 0){
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter += `AND name like '%${filter.name}%'` :  strFilter += `name like '%${filter.name}%'`
        if(filter.address !== undefined) strFilter.length > 0 ? strFilter += `AND address like '%${filter.address}%'` :  strFilter += `address like '%${filter.address}%'`
        if(filter.city !== undefined) strFilter.length > 0 ? strFilter += `AND city like '%${filter.city}%'` :  strFilter += `city like '%${filter.city}%'`
        if(filter.province !== undefined) strFilter.length > 0 ? strFilter += `AND province like '%${filter.province}%'` :  strFilter += `email like '%${filter.province}%'`
        if(filter.country !== undefined) strFilter.length > 0 ? strFilter += `AND country like '%${filter.country}%'` :  strFilter += `email like '%${filter.country}%'`
        if(filter.status !== undefined) strFilter.length > 0 ? strFilter += `AND status like '%${filter.status}%'` :  strFilter += `status like '%${filter.status}%'`
    }
    Location.showAll(strFilter, (err, data)=> 
    {   
        data.length > 0 ? successMessage(response, data) : errMessage(response, "Location data not found")   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String defined")
    if(receivedBody.address === undefined) return errMessage(response, "Address must be String defined")
    if(receivedBody.city === undefined) return errMessage(response, "City must be String defined")
    if(receivedBody.province === undefined) return errMessage(response, "Province must be String defined")
    if(receivedBody.country === undefined) return errMessage(response, "Country must be String defined")
    if(receivedBody.status === undefined) return errMessage(response, "Status must be Integer defined")
    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")

    //SEND DATA TO MODELS
    const newLocation = new Location(receivedBody)
    Location.create(newLocation, (err, data)=>{
        err ? errMessage(response, err) : successMessage(response, {message:"Location added successfully!"})
    })
}

exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    Location.findById(id, function(err, data) {
        err ? errMessage(response, err) : successMessage(response, data)
    });
};

exports.update = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String filled")
    if(receivedBody.address === undefined) return errMessage(response, "Address must String filled")
    if(receivedBody.status === undefined) return errMessage(response, "Status must Integer filled")
    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")
    
    //SEND DATA TO MODELS
    const newData = new Location(receivedBody)
    Location.update(request.params.id, newData, (err, data)=>{
        err ? errMessage(response, err.sqlMessage) : successMessage(response,{message:"Location successfully updated!"})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    Location.delete(id, function(err) {
        err ? errMessage(response, err.sqlMessage) : successMessage(response,{message:"Location successfully deleted!"})    });
};


