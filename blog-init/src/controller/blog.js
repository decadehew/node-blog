// @ts-ignore
const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '標題A',
      content: '內容A',
      createTime: 1589122111341,
      author: 'Yong'
    },
    {
      id: 2,
      title: '標題B',
      content: '內容B',
      createTime: 1589122175752,
      author: 'Jovi'
    },
    {
      id: 3,
      title: '標題C',
      content: '內容C',
      createTime: 1589122222585,
      author: 'Kenny'
    }
  ]
};

// @ts-ignore
const getDetail = (id) => {
  return {
    id: 3,
    title: '標題C',
    content: '內容C',
    createTime: 1589122222585,
    author: 'Kenny'
  };
}

// @ts-ignore
const newBlog = (blogData = {}) => {
  return {
    id: 4,
  }
}

// @ts-ignore
const updateBlog = (id, blogData = {}) => {
  return true;
}

// @ts-ignore
const deleteBlog = (id) => {
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
