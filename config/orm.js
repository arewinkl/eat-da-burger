var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for(var i = 0; i < num; i++) {
    Array.push("?");
  }
  return Array.toString();
}

function objToSql(obj) {
  var arr = [];
  for(var key in obj){
    var value = obj[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if(typeof value === "string" && ValidityState.indexOf(" ") >= 0) {    //concatonates values
        value = "'" + value + "'" ;
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    insertOne: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
        //addition of a delete one function
      deleteOne: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
  };





// Export the ORM object in module.exports.
module.exports = orm;