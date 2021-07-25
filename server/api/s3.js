const AWS = require('aws-sdk');
const password = require('../db/password');
const s3 = new AWS.S3(password.s3);

const folder = 'avatars';
const filePrefix = 'avatar';
const keyPrefix = `${folder}/${filePrefix}_`;

module.exports.upload = (req, res) => {
  const param = {
    Bucket: 'rest-app-soulware',
    Key: `${keyPrefix}${req.body.id}.${req.files.file.mimetype.split('/')[1]}`,
    ACL: 'public-read',
    Body: req.files.file.data,
    ContentType: req.files.file.mimetype,
  };
  s3.upload(param, function(err, data) {
    if (err) console.log(err);
    res.json({ success: true, url: data.Location });
  });
};
module.exports.delete = (req, res) => {
  const avatar = req.body.user.avatar.split('.');
  const extension = avatar[avatar.length - 1];

  const param = {
    Bucket: 'rest-app-soulware',
    Key: `${keyPrefix}${req.body.id}.${extension}`,
  };

  s3.deleteObject(param, function(err, data) {
    if (err) console.log(err);
    console.log(data);
    res.json({ success: true, url: data });
  });
};
