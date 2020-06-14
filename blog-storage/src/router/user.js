const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // if (method === 'POST' && req.path === '/api/user/login') {
  //   const { username, password } = req.body;
  //   const result = login(username, password);
    
  //   return result.then(data => {
  //     if (data.username) {
  //       return new SuccessModel();
  //     }
  //     return new ErrorModel('登入失敗');
  //   })
  // }

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body; // post
    // const { username, password } = req.query; // get
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 操作 cookie
        // 不要讓前端改, 加 httpOnly 只允許後端來改
        // 注意設定httpOnly的話，cookie value會有空格 (trim)
        // 如expires过期，cookie就没有了
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);

        req.session.username = data.username;
        req.session.realname = data.realname;

        // 從db獲取data後，設置 redis
        set(req.sessionID, req.session);

        console.log('存進去 req.session ', req.session)

        return new SuccessModel(data);
      }
      return new ErrorModel('login 失敗');
    })
  }

  // 測試登入驗證
  // if (method === 'GET' && req.path === '/api/user/login-test') {
    // if (req.session.username) {
    //   return Promise.resolve(new SuccessModel({
    //     session: req.session
    //   }));
    // }
    // return Promise.resolve(new ErrorModel('還沒登入'));
  // }
  
}

module.exports = handleUserRouter;