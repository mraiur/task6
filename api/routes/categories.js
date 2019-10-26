let express = require('express');
let router = express.Router();
let Database = require('../library/Database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('list all products');
  res.send('respond with a resource');
});


router.get('/:category_id', function(req, res, next) {
  const category_id = parseInt(req.params.category_id, 10);
  const products = Database.getProductsByCategory(category_id);
  return res.json(products);
});

module.exports = router;
