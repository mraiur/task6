let express = require('express');
let router = express.Router();
let Database = require('../library/Database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'shop', categories: Database.getCategories()});
});

module.exports = router;
