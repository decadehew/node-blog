const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
let REDIS_CONFIG;

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myBlog'
  };

  REDIS_CONFIG = {
    host: 'localhost',
    port: '6379'
  }
}

if (env === 'prod') {}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}