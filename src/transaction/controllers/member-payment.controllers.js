'use strict';

const MemberPayment = require('../models/member-payment.models')
const errMessage=(response, message)=> response.status(400).send({success:false, message})
const successMessage=(response, data)=> response.status(200).send({success:true, data})
const validation=(response, data)=>{
    //if body is empty
    if(data.constructor === Object && Object.keys(data).length === 0) return errMessage(response, "Please fill all required field")
    //validation of field
    if(data.payment_location === undefined) return errMessage(response, "Payment_location must Integer Defined")
    if(data.payment_date === undefined) return errMessage(response, "Payment date must Date Defined")
    if(data.payment_number === undefined) return errMessage(response, "Name must String Defined")
    if(data.description === undefined) data = {...data, description:""}
    if(data.payment_method === undefined) return errMessage(response, "Payment Method must Integer Defined")
    if(data.member_id === undefined || data.member_id === 0) return errMessage(response, "MemberPayment Id must Integer Defined")
    if(data.member_amount === undefined) return errMessage(response, "member_amount must Double Defined")
    if(data.use_trainer === undefined) data = {...data, use_trainer:0}
    if(data.trainer_id === undefined) data = {...data, trainer_id:0}
    if(data.trainer_amount === undefined) data = {...data, trainer_amount:0}
    if(data.tax_id === undefined) data = {...data, tax_id:0}
    if(data.tax_amount === undefined) data = {...data, tax_amount:0}
    if(data.pay_duration === undefined) return errMessage(response, "Pay Duration must Integer Defined")
    if(data.disc_percent === undefined) data = {...data, disc_percent:0}
    if(data.disc_amount === undefined) data = {...data, disc_percent:0}
    if(data.charge_percent === undefined) data = {...data, disc_percent:0}
    if(data.charge_amount === undefined) data = {...data, disc_percent:0}
    if(data.total_amount === undefined) data = {...data, disc_percent:0}
    if(data.created_by === undefined) data = {...data, created_by:0}
    if(data.updated_by === undefined) data = {...data, updated_by:0}

    return data
}


exports.showAll = (request, response)=>{
    let filter = request.query.filter === undefined ? null : request.query.filter;
    const sort = request.query.sort !== undefined ? request.query.sort : ""
    const pageNumber = request.query.pageNumber !== undefined ? request.query.pageNumber : 0
    const rowsPerPage = request.query.rowsPerPage !== undefined ? request.query.rowsPerPage : 0   
    MemberPayment.showData(filter, sort, pageNumber, rowsPerPage, (error, member)=> 
    {  
        member !== null ? successMessage(response, member) : errMessage(response, error)   
    })
}

exports.create = (request, response)=>{
    let receivedBody = validation(response, request.body);
    //send member to models
    const newMember = new MemberPayment(receivedBody)
    MemberPayment.create(newMember, (error, member)=>{
        error ? errMessage(response, error) : successMessage(response, {message:member})
    })
}
exports.findById = function(request, response) {
    const id = parseInt(request.params.id)
    let strFilter = id > 0 && JSON.stringify({id})
    MemberPayment.showData(strFilter, "", 1, 1, function(error, member) {
        member !== null ? successMessage(response, member): errMessage(response, error) 
    });
};

exports.update = (request, response)=>{
    let receivedBody = validation(response, request.body);
    //send member to models
    const updatedMember = new MemberPayment(receivedBody)
    MemberPayment.update(request.params.id, updatedMember, (error, member)=>{
        error ? errMessage(response, error.sqlMessage) : successMessage(response, {message:"MemberPayment successfully updated!"})
    })
}

exports.delete = function(request, response) {
    const id = parseInt(request.params.id)
    MemberPayment.delete(id, function(error) {
        error ? errMessage(response, error.sqlMessage) :successMessage(response, {message:"MemberPayment successfully deleted!"})
    });
};


