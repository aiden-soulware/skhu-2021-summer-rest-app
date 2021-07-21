var express = require('express');
var router = express.Router();
const management = require('../api/user');

router.get('/list', function(req, res, next) {
  management.list(req, res);
});

module.exports = router;
