const { executeSQL } = require('../db/mysql');

const getList = (author, keyword) => {
  // 1=1 是永远成立,避免以下不滿足，直接加 order by 就會變成 sql syntax 錯誤
  let sql = `select * from blogs where 1=1 `

  if (author) {
    sql += `and author = '${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return executeSQL(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where id = ${id};`

  return executeSQL(sql).then(rows => {
    return rows[0];
  });
}

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;

  console.log(content)

  let sql = `
    insert into blogs (title, content, createtime, author) values ('${title}', "${content}", ${Date.now()}, '${author}');
  `;

  return executeSQL(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `
    update blogs set title = '${title}', content = '${content}' where id = '${id}';
  `;

  return executeSQL(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`

  return executeSQL(sql).then(deleteData => {
    return deleteData.affectedRows > 0;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
