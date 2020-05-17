const env = process.env.NODE_ENV;

let MYSQL_CONFIG;

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myBlog'
  };
}

if (env === 'prod') {}

module.exports = {
  MYSQL_CONFIG
}