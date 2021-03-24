'use strict';

exports.showData=(sqlCommand="", filter="", sort="", pageNumber=1, rowsPerPage=10)=>{
    if(sqlCommand.length === 0) return console.log("syntax empty") // VALIDATION WHEN SQL COMMAND IS EMPTY
    if(filter.length > 0) sqlCommand += ` WHERE ${filter}` //USING FILTER IF FILTER IS NOT EMPTY
    if(sort.length > 0) sqlCommand += ` ORDER BY ${sort}` // USING SORT IF SORT PARAM IS NOT EMPTY
    if(pageNumber > 0)sqlCommand += ` LIMIT ${rowsPerPage} OFFSET ${(pageNumber-1) * rowsPerPage}` //PAGINATION COMMAND
    return sqlCommand
}