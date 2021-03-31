'use strict';
const mysql = require('../../../utils/mysql.config')
const sql = require('../../../utils/mysql.query')
const validation= async (connection, tableName, fieldName, values)=>{
    const sql = `select count(${fieldName}) as ${fieldName} from ${tableName} where ${fieldName} = ${values} LIMIT 1`
    if (values > 0){
        const validation = await connection.query(sql)
        if(validation[0][fieldName] === 0) return false
    }
    return true
}

//creating MemberPayment object
const MemberPayment = function(payment){
    this.payment_location = payment.payment_location
    this.payment_date = payment.payment_date
    this.payment_number = payment.payment_number
    this.description = payment.description
    this.payment_method = payment.payment_method
    this.member_id = payment.member_id
    this.member_amount = payment.member_amount
    this.use_trainer = payment.use_trainer
    this.trainer_id = payment.trainer_id
    this.trainer_amount = payment.trainer_amount
    this.tax_id = payment.tax_id
    this.tax_amount = payment.tax_amount
    this.pay_duration = payment.pay_duration
    this.disc_percent = payment.disc_percent
    this.disc_amount = payment.disc_amount
    this.charge_percent = payment.charge_percent
    this.charge_amount = payment.charge_amount
    this.total_amount = payment.total_amount
    this.created_date = new Date()
    this.updated_date = new Date()
    this.created_by =  payment.created_by
    this.updated_by = payment.updated_by

}

MemberPayment.create = async (payment, result)=>{
    const connection = await mysql.connection()
    try{
        console.log("at created payment...");
        await connection.query("START TRANSACTION");
        //VALIDATION WHEN JOINED TABLE IS NOT NULL AND HAVE NO ID
        if(!await validation(connection, 'location', 'id', payment.payment_location)) return result("Location data not found", null)
        if(!await validation(connection, 'payment_method', 'id', payment.payment_method)) return result("Payment Method data not found", null)
        if(!await validation(connection, 'member', 'id', payment.member_id)) return result("Member Data Not found", null)
        if(!await validation(connection, 'trainer', 'id', payment.trainer_id)) return result("Trainer data Not found", null)
        if(!await validation(connection, 'tax', 'id', payment.tax_id)) return result("Tax Not found", null)
        if(!await validation(connection, 'user', 'id', payment.created_by)) return result("User Not found", null)
        
        //INSERT TO PAYMENT TABLE
        await connection.query(`insert into member_payment set?`, payment)

        //UPDATING MEMBER'S EXPIRED DATE
        await connection.query(
            `update member set 
            expired_date = 
            CASE WHEN expired_date < '${payment.payment_date}' 
            THEN DATE_ADD('${payment.payment_date}', INTERVAL ${payment.pay_duration} DAY) 
            ELSE DATE_ADD(expired_date, INTERVAL ${payment.pay_duration} DAY) 
            END 
            WHERE id = ${payment.member_id}`)
        
        //COMMIT TRANSACTION
        await connection.query("COMMIT");
        result(null, "Payment Success")
    }catch(err){
        await connection.query("ROLLBACK");
        result(`Failed to Payment Proccess: ${err.message}`, null)
    }
    finally {
        await connection.release();
    }
    
}

MemberPayment.showData = async (filter=null, sort="", pageNumber="", rowsPerPage="", result)=>{
    const connection = await mysql.connection()
    let strFilter = "";
    try{
        if(filter !== null){
            filter = JSON.parse(filter);
            if(filter.id !== undefined) strFilter.length > 0 ? strFilter += `AND mp.payment_id = ${filter.id}` :  strFilter += ` mp.payment_id = ${filter.id}`
        }
         
        let sqlCommand = `SELECT mp.*, m.name as member_name, m.membership_type as membership_type, 
        IFNULL(mt.name,"") as membership_name, 
        IFNULL(mt.price,0) AS membership_price, 
        IFNULL(l.name,"") as joined_location_name, 
        IFNULL(l.address,"") AS joined_location_address,
        IFNULL(t.name,"") AS trainer_name,
        IFNULL(t.salary,0) AS trainer_price  
        FROM member_payment mp 
        JOIN member m on m.id = mp.member_id
        JOIN membership_type mt ON m.membership_type = mt.id
        JOIN location l ON mp.payment_location = l.id
        LEFT JOIN trainer t ON mp.trainer_id = t.id` 
        const data = await connection.query(sql.commandSelect(sqlCommand, strFilter, sort, pageNumber, rowsPerPage))
        if(data.length === 0) return result("Payment Data not found", null)
        result(null, data)
    } catch(err){
        result(err, null)
    }finally {
        await connection.release()
    }
    
}

MemberPayment.update = function(id, member, result){
    //member payment update on progress....
    mysql.query(
    `UPDATE MemberPayment SET 
    name=?,gender=?,date_of_birth=?,email=?,phone=?,address=?,city=?,province=?, country=?,
    membership_type=?, joined_date=?,expired_date=?,joined_location=?,status=?,trainer_id=?,
    updated_by=?, updated_date=? WHERE id = ?`, 
    [member.name,member.gender,member.date_of_birth,member.email,member.phone, member.address,member.city,member.province, member.country,
    member.membership_type, member.joined_date, member.expired_date, member.joined_location,member.status,member.trainer_id,
    member.updated_by,member.updated_date], 
    (error, response)=> error ? result(error, null) : result(null, response))  
};

MemberPayment.delete = async (id, result)=>{
    const connection = await mysql.connection()
    try{
        //checking member payment by id
        const paymentData = await connection.query(`select pay_duration, member_id from Member_Payment where payment_id=? LIMIT 1`, id);   
        if(paymentData.length > 0){
            await connection.query("START TRANSACTION");
            //deleting member payment
            let sql = `delete from Member_Payment where payment_id=${id}`
            await connection.query(sql);
            //updating member's expired date
            sql = `update Member set expired_date = date_ADD(expired_date, INTERVAL -${paymentData[0].pay_duration} DAY) where id=${paymentData[0].member_id}`
            await connection.query(sql);
            await connection.query("COMMIT");
            //RESULT
            result(null, "Member payment successfully deleted")
        }else{ 
            return result("Member Payment doesn't exist")
        }
    }catch(err){
        await connection.query("ROLLBACK")
        result(`Failed to deleting Payment: ${err.message}`, null)
    }finally{
        await connection.release()
    }
}

module.exports = MemberPayment