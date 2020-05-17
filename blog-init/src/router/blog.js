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
    const data = getList(author, keyword);
  
    return new SuccessModel(data);
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id);

    return new SuccessModel(data);
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body;
    const data = newBlog(blogData);

    return new SuccessModel(data);
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const data = updateBlog(id, req.body);

    if (data) {
      return new SuccessModel();
    } {
      return new ErrorModel('更新博客失敗');
    }
    
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const data = deleteBlog(id);

    if (data) {
      return new SuccessModel();
    } {
      return new ErrorModel('删除博客失敗');
    }
  }
}

module.exports = handleBlogRouter;