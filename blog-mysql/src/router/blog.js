const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog 
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);

    return result.then(data => new SuccessModel(data));  
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);

    return result.then(data => new SuccessModel(data));
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    req.body.author = 'DecadeHew';

    const blogData = req.body;
    const result = newBlog(blogData);

    return result.then(data => new SuccessModel(data));
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
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
    const result = deleteBlog(id, 'DecadeHew');

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