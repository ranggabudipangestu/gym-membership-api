'use strict';

const Trainer = require('../models/trainer.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})

exports.showAll = (request, response)=>{
    let filter = request.body;
    let strFilter = "";
    if(Object.keys(filter).length > 0){
        if(filter.code !== undefined ) strFilter.length > 0 ? strFilter += `AND code like '%${filter.code}%'` :  strFilter += `code like '%${filter.code}%'`
        if(filter.name !== undefined) strFilter.length > 0 ? strFilter += `AND name like '%${filter.name}%'` :  strFilter += `name like '%${filter.name}%'`
        if(filter.email !== undefined) strFilter.length > 0 ? strFilter += `AND email like '%${filter.email}%'` :  strFilter += `email like '%${filter.email}%'`
        if(filter.phone !== undefined) strFilter.length > 0 ? strFilter += `AND phone like '%${filter.phone}%'` :  strFilter += `phone like '%${filter.phone}%'`
        if(filter.address !== undefined) strFilter.length > 0 ? strFilter += `AND address like '%${filter.address}%'` :  strFilter += `address like '%${filter.address}%'`
        if(filter.status !== undefined) strFilter.length > 0 ? strFilter += `AND status like '%${filter.status}%'` :  strFilter += `status like '%${filter.status}%'`
    }
    Trainer.showAll(strFilter, (error, trainer)=> 
    {  
        trainer !== null ? successMessage(response, trainer) : errMessage(response, "Trainer data not found")   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    //if body is empty
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) errMessage(response, "Please fill all required field")
    //validation of field
    if(receivedBody.name === undefined) return errMessage(response, "Name must be filled")
    if(receivedBody.email === undefined) receivedBody = {...receivedBody, email:""}
    if(receivedBody.phone === undefined) receivedBody = {...receivedBody, phone:""}
    if(receivedBody.address === undefined) receivedBody = {...receivedBody, address:""}
    if(receivedBody.status === undefined) receivedBody = {...receivedBody, status:1}
    if(receivedBody.salary === undefined || typeof(receivedBody.salary) !== Number) receivedBody = {...receivedBody, salary:0}
    //send trainer to models
    const newTrainer = new Trainer(receivedBody)
    Trainer.create(newTrainer, (error, trainer)=>{
        error ? errMessage(response, error) : successMessage(response, {message:"Trainer added successfully!"})
    })
}
exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    Trainer.findById(id, function(error, trainer) {
        error ? errMessage(response, error) : successMessage(response, trainer)
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
    //send trainer to models
    const updatedTrainer = new Trainer(receivedBody)
    Trainer.update(request.params.id, updatedTrainer, (error, trainer)=>{
        error ? errMessage(response, error.sqlMessage) : successMessage(response, {message:"Trainer successfully updated!"})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    Trainer.delete(id, function(error) {
        error ? errMessage(response, error.sqlMessage) :successMessage(response, {message:"Trainer successfully deleted!"})
    });
};


