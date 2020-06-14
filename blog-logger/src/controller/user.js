const { executeSQL } = require('../db/mysql');

const login = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `

  return executeSQL(sql).then(userData => {
    return userData[0] || {};
  })
}


module.exports = {
  login
};
