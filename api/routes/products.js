const express = require('express');
const router = express.Router();
const Database = require('../library/Database');
const ProductValidator = require('./validators/products');
const AuthValidator = require('./validators/auth');
const VATRates = require('vatrates');
const vatRates = new VATRates();
const countryCode = 'BG';
const vatRatePercent = vatRates.getStandardRate(countryCode);

function priceWithVAT(price)
{
  return price * (1 + (1/vatRatePercent));
}
console.log(`example vat rate for country: ${countryCode}: ${vatRatePercent}` );
router.get('/', function(req, res, next) {

  const products = Database.getAllProducts();
  products.forEach(product=>{
    let price = parseFloat(product.price);
    product.priceVat = priceWithVAT(price );
  });
  res.json(products);
});

router.post('/', AuthValidator.isAuth, ProductValidator.productData, function(req, res) {
  let product = Database.createProduct(req.body);
  if( product )
  {
    product.priceVat = priceWithVAT( product.price );
    return res.status(201).json(product);
  }
  return res.json({success: false, message: 'Problem creating product'});
});

router.put('/:id', AuthValidator.isAuth, ProductValidator.productData, function(req, res) {
  let id = parseInt(req.params.id, 10);
  let data = req.body;
  if( Database.updateProduct(id, data) )
  {
    let product = Database.getProduct(id);
    product.priceVat = priceWithVAT( product.price );
    return res.status(200).json(product);
  }
  //TODO better error handling
  return res.status(400).json({success: false, message: 'Problem updating product'});
});

router.delete('/:id', AuthValidator.isAuth, function(req, res) {
  let id = parseInt(req.params.id, 10);
  if( Database.deleteProduct(id) )
  {
    return res.status(200).json({success: true, message: `Deleted product with id : ${id}`});
  }
  return res.status(400).json({success: false, message: 'Problem deleting product'});
});

module.exports = router;
