const loginCheck = (username, password) => {
  if (username === 'decadehew' && password === '123') {
    return true;
  }
  return false;
}


module.exports = {
  loginCheck
};
