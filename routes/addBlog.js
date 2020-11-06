var express = require('express');
var router = express.Router();

/* GET Add Blogs page. */
router.get('/', function(req, res, next) {
  res.render('add-blog');
});

module.exports = router;