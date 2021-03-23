'use strict';

const Trainer = require('../models/trainer.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})

exports.showAll = (request, response)=>{
    let filter = request.body;
    if(Object.keys(filter).length === 0) filter = null //if string is null
    Trainer.showAll(filter, (err, data)=> 
    {   console.log(err)
        data.length > 0 ? response.send(data) : errMessage(response, "Trainer data not found")   
    })
}

exports.create = (request, response)=>{
    let receivedBody = request.body;
    //if body is empty
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) errMessage(response, "Please fill all required field")
    //validation of field
    if(receivedBody.code === undefined) return errMessage(response, "Code must be filled")
    if(receivedBody.name === undefined) return errMessage(response, "Name must be filled")
    if(receivedBody.email === undefined) receivedBody = {...receivedBody, email:""}
    if(receivedBody.phone === undefined) receivedBody = {...receivedBody, phone:""}
    if(receivedBody.address === undefined) receivedBody = {...receivedBody, address:""}
    if(receivedBody.salary === undefined || typeof(receivedBody.salary) !== Number) receivedBody = {...receivedBody, salary:0}
    //send data to models
    const newTrainer = new Trainer(receivedBody)
    Trainer.create(newTrainer, (err, data)=>{
        err ? errMessage(response, err) : response.json({success:true, message:"Trainer added successfully!", data})
    })
}
exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    Trainer.findById(id, function(err, data) {
        err ? errMessage(response, err) : response.json(data)
    });
};

exports.update = (request, response)=>{
    let receivedBody = request.body;
    //if body is empty
    if(receivedBody.constructor === Object && Object.keys(receivedBody).length === 0) errMessage(response, "Please fill all required field")
    //validation of field
    if(receivedBody.code === undefined) return errMessage(response, "Code must be filled")
    if(receivedBody.name === undefined) return errMessage(response, "Name must be filled")
    if(receivedBody.email === undefined) receivedBody = {...receivedBody, email:""}
    if(receivedBody.phone === undefined) receivedBody = {...receivedBody, phone:""}
    if(receivedBody.address === undefined) receivedBody = {...receivedBody, address:""}
    if(receivedBody.salary === undefined || typeof(receivedBody.salary) !== Number) receivedBody = {...receivedBody, salary:0}
    //send data to models
    const newData = new Trainer(receivedBody)
    Trainer.update(request.params.id, newData, (err, data)=>{
        err ? errMessage(response, err.sqlMessage) : response.json({success:true,message:"Trainer successfully updated!",data})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    Trainer.delete(id, function(err) {
        err ? errMessage(response, err.sqlMessage) : response.json({success:true,message:"Trainer successfully deleted"})
    });
};


