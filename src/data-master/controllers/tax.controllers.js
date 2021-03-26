'use strict';
const Tax = require('../models/tax.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})
exports.showAll = (request, response)=>{
    let filter = request.body;
    let strFilter = "";
    // IF FILTER IS NOT EMPTY
    if(Object.keys(filter).length > 0) {
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter.concat(`AND name like '%${filter.name}%'`) :  strFilter += `name like '%${filter.name}%'`
        if(filter.percentage !== undefined) strFilter.length > 0 ? strFilter += `AND percentage like '%${filter.percentage}%'` :  strFilter += `percentage like '%${filter.percentage}%'`
        if(filter.status !== undefined) strFilter.length > 0 ? strFilter += `AND status like '%${filter.status}%'` :  strFilter += `status like '%${filter.status}%'`  
    }
    Tax.showAll(strFilter, (error, tax)=> 
    {   
        tax.length > 0 ? successMessage(response, tax) : errMessage(response, "Tax not found")   
    })
}
exports.create = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String defined")
    if(receivedBody.percentage === undefined) return errMessage(response, "Percentage must be Number defined")
    if(receivedBody.status === undefined) return errMessage(response, "Status must be Integer defined")
    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")

    //SEND DATA TO MODELS
    const newTax = new Tax(receivedBody)
    Tax.create(newTax, (error, tax)=>{
        error ? errMessage(response, error) : successMessage(response, {message:"Tax added successfully!"})
    })
}
exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    Tax.findById(id, function(error, tax) {
        error ? errMessage(response, error) : successMessage(response, tax)
    });
};
exports.update = (request, response)=>{
    let receivedBody = request.body;
    //VALIDATION IF BODY IS EMPTY
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) return errMessage(response, "Please fill all required field")
    //VALIDATION OF UNDEFINED FIELD
    if(receivedBody.name === undefined) return errMessage(response, "Name must be String defined")
    if(receivedBody.percentage === undefined) return errMessage(response, "Percentage must be Number defined")
    if(receivedBody.status === undefined) return errMessage(response, "Status must be Integer defined")
    //VALIDATION REQUIRED FIELD
    if(receivedBody.name.length === 0) return errMessage(response, "Name can't be empty")
    //SEND DATA TO MODELS
    const updatedTax = new Tax(receivedBody)
    Tax.update(request.params.id, updatedTax, (error, tax)=>{
        error ? errMessage(response, error.sqlMessage) : successMessage(response,{message:"Tax successfully updated!"})
    })
}
exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    Tax.delete(id, function(error) {
        error ? errMessage(response, error.sqlMessage) : successMessage(response,{message:"Tax successfully deleted!"})    
    });
};


