var AWS = require('aws-sdk');
const password = require('../db/password');

var s3 = new AWS.S3(password.s3);

module.exports.upload = (req, res) => {
  // var param = {
  //   Bucket: 'rest-app-soulware',
  //   Key: `avatars/${req.body.name}.${req.files.file.mimetype.split('/')[1]}`,
  //   ACL: 'public-read',
  //   Body: req.files.file.data,
  //   ContentType: req.files.file.mimetype,
  // };
  // s3.upload(param, function(err, data) {
  //   if (err) console.log(err);
  //   res.json({ success: true, url: data.Location });
  // });
};
