const express = require('express');
const router = express.Router();
const management = require('../api/s3');
const cors = require('cors');

router.use(cors());

router.post('/upload', function(req, res, next) {
  management.upload(req, res);
});
router.post('/delete', function(req, res, next) {
  management.delete(req, res);
});

module.exports = router;
