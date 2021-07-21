const mysql = require('../db/mysql');

module.exports.userMapping = (user) => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar,
    create_Time: user.create_time,
  };
};

module.exports.userListMapping = (userList) => {
  return userList.map((user) => this.userMapping(user));
};

module.exports.list = (req, res) => {
  const sql = `SELECT * FROM user;`;

  mysql.query(sql, (err, rows) => {
    if (err) return console.log(`list error: ${err}`);
    res.json({ success: true, data: this.userListMapping(rows) });
  });
};
