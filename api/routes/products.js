let express = require('express');
let router = express.Router();
let Database = require('../library/Database');
let ProductValidator = require('./validators/products');

router.get('/', function(req, res, next) {
  const products = Database.getAllProducts();
  res.json(products);
});

router.post('/', ProductValidator.productData, function(req, res) {
  let product = Database.createProduct(req.body);
  if( product )
  {
    return res.json(product);
  }
  return res.json({success: false, message: 'Problem creating product'});
});

router.put('/:id', ProductValidator.productData, function(req, res) {
  //TODO validate data before update
  let id = parseInt(req.params.id, 10);
  let data = req.body;
  if( Database.updateProduct(id, data) )
  {
    return res.json(Database.getProduct(id));
  }
  //TODO better error handling
  return res.json({success: false, message: 'Problem updating product'});
});

router.delete('/:id', function(req, res) {
  let id = parseInt(req.params.id, 10);
  if( Database.deleteProduct(id) )
  {
    return res.json({success: true, message: `Deleted product with id : ${id}`});
  }
  return res.json({success: false, message: 'Problem deleting product'});
});

module.exports = router;
