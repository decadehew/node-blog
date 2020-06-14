const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

client.on('error', function(error) {
  console.error(error);
});

function set (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  client.set(key, value, redis.print);
}

function get (key) {
  const promise = new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        return reject(err);

        // 一般来说，调用resolve或reject以后，Promise 的使命就完成了，
        // 后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。
        // 所以，最好在它们前面加上return语句，这样就不会有意外。
        // by ruanyifeng promise

      }

      if (value === null) {
        return resolve(null);
      }

      try {
        resolve(JSON.parse(value));
      } catch (err) {
        resolve(err);
      }
    });
  })

  return promise;
  
}

module.exports = {
  set,
  get
}