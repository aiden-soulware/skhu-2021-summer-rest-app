const mysql = require('../db/mysql');

module.exports.userMapping = (user) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    avatar: user.avatar,
    createTime: user.create_time,
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
module.exports.find = (req, res) => {
  const id = req.params.id || req.query.id;
  const sql = `SELECT * FROM user WHERE id = ?`;

  mysql.query(sql, id, (err, rows, fields) => {
    if (err) return console.log('find err: ', err);

    res.status(200).json({ success: true, user: this.userMapping(rows[0]) });
  });
};
module.exports.create = (req, res) => {
  const { firstName, lastName, email } = req.body;
  const sql = `INSERT INTO user(first_name, last_name, email) VALUES("${firstName}","${lastName}","${email}")`;
  const msg = 'User created successfully';
  mysql.query(sql, (err, rows, fields) => {
    if (err) return console.log('create err: ', err);
    console.log(msg);
  });
  res.status(200).json({ success: true, message: msg });
};
