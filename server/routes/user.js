const express = require('express');
const router = express.Router();
const management = require('../api/user');
const cors = require('cors');

router.use(cors());

router.get('/list', function(req, res, next) {
  management.list(req, res);
});

module.exports = router;
