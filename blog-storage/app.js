const querystring = require('querystring');
const { get, set } = require('./src/db/redis');
const getPostData = require('./src/utils/post-data');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// const SESSION_DATA = {};

const getCookieExpires = () => {
  const date = new Date();
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
  console.log('Date: ', date.toUTCString())
  return date.toUTCString();
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];

  // parse query
  req.query = querystring.parse(url.split('?')[1]);
  
  // parse cookie
  req.cookie = {};
  const cookieString = req.headers.cookie || ''; // 'username=xxx;realname=yyy'
  cookieString.split(';').forEach(cookieItem => {
    if (!cookieItem) return;

    const arr = cookieItem.split('=') // [username, xxx]
    const key = arr[0].trim();
    const value = arr[1].trim();

    req.cookie[key] = value;
  })

  console.log('app.js 解析 cookie', req.cookie)

  // parse session
  // let needSetCookie = false;
  // let userID = req.cookie.userid;
  // if (userID) {
  //   if (!SESSION_DATA[userID]) {
  //     SESSION_DATA[userID] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //   userID = `${Date.now()}_${Math.random()}`; // 類似 uuid
  //   SESSION_DATA[userID] = {};
  // }
  // req.session = SESSION_DATA[userID];

  // session to redis
  let needSetCookie = false;
  let userID = req.cookie.userid;
  if (!userID) {
    needSetCookie = true;
    userID = `${Date.now()}_${Math.random()}`;
    set(userID, {});
  }
  
  req.sessionID = userID;
  get(req.sessionID).then(sessionData => {
    if (sessionData === null) {
      // 初始化 redis 中的 session
      set(req.sessionID, {});
      // 設置 session
      req.session = {};
    } else {
      req.session = sessionData;
    }
    
    console.log('app.js req.session: ', req.session);

    return getPostData(req);
  })
  .then(postData => {
    req.body = postData;

    // const blogData = handleBlogRouter(req, res);
    // const userData = handleUserRouter(req, res);

    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return;
    // }

    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return;
    // }

    const blogResult = handleBlogRouter(req, res);
    const userResult = handleUserRouter(req, res);


    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userID}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }

        res.end(JSON.stringify(blogData));
      })
      return;
    }

    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userID}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }

        res.end(JSON.stringify(userData));
      })
      return;
    }

    // 404
    res.writeHead(404, {"Content-type": "text/plaint"});
    res.write('404 Not Found\n');
    res.end();
  })
}

module.exports = serverHandle;
