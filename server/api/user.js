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
  const { firstName, lastName, email, avatar } = req.body;

  // user creation
  const input = `INSERT INTO user(first_name, last_name, email, avatar) VALUES("${firstName}","${lastName}","${email}","${avatar}")`;
  mysql.query(input, (err, rows, fields) => {
    if (err) return console.log('create err: ', err);
  });
  res.status(200).json({ success: true, message: 'User created successfully' });
};

module.exports.emailCheck = (req, res) => {
  // email check
  const sql = `SELECT id FROM user WHERE email = "${req.body.email}"`;
  mysql.query(sql, (err, rows, fields) => {
    if (err) return console.log('email find err: ', err);

    if (rows == '') {
      res.status(200).json({
        success: false,
        message: 'You may use this email.',
      });
    } else
      res.status(200).json({
        success: true,
        message: 'This e-mail already exists. Try another e-mail.',
        id: rows[0].id,
      });
  });
};
