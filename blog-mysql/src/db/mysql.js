const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect();

function executeSQL (sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    })
  });

  return promise;
}

module.exports = {
  executeSQL
}
