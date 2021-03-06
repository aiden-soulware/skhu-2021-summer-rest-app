const express = require('express');
const router = express.Router();
const management = require('../api/user');
const cors = require('cors');

router.use(cors());

router.get('/list', function(req, res, next) {
  management.list(req, res);
});
router.get('/:id', function(req, res, next) {
  management.find(req, res);
});
router.post('/create', function(req, res, next) {
  management.create(req, res);
});
router.post('/update', function(req, res, next) {
  management.update(req, res);
});
router.post('/delete', function(req, res, next) {
  management.delete(req, res);
});
router.post('/email', function(req, res, next) {
  management.emailCheck(req, res);
});
module.exports = router;
