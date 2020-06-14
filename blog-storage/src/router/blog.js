const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog 
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 統一登入驗證 middleware
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('還沒登入'));
  }
  
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }

      author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then(data => new SuccessModel(data));  
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);

    return result.then(data => new SuccessModel(data));
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    
    req.body.author = req.session.username;
    const blogData = req.body;
    const result = newBlog(blogData);

    return result.then(data => new SuccessModel(data));
  }

  if (method === 'POST' && req.path === '/api/blog/update') {

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);

    return result.then(data => {
      if (data) {
        return new SuccessModel();
      } {
        return new ErrorModel('更新博客失敗');
      }
    })
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const result = deleteBlog(id, req.session.username);

    return result.then(data => {
      if (data) {
        return new SuccessModel();
      } {
        return new ErrorModel('删除博客失敗');
      }
    })
  }
}

module.exports = handleBlogRouter;