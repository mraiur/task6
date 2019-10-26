const express = require('express');
const router = express.Router();
const Database = require('../library/Database');
const OrderValidator = require('./validators/orders');
const AuthValidator = require('./validators/auth');

/* GET users listing. */
router.get('/', AuthValidator.isAuth, function(req, res, next) {
  const orders = Database.getAllOrders();
  res.json(orders);
});

router.post('/', AuthValidator.isAuth, OrderValidator.orderData, function(req, res) {
  let order = Database.createOrder(req.body);
  if( order )
  {
    return res.json(order);
  }
  return res.json({success: false, message: 'Problem creating order'});
});

router.put('/:id', AuthValidator.isAuth, OrderValidator.statusChange, function(req, res) {
  let id = parseInt(req.params.id, 10);
  let data = req.body;
  if( Database.updateOrderStatus(id, data.status) )
  {
    return res.json(Database.getOrder(id));
  }
  return res.json({success: false, message: 'Problem updating order status'});
});


module.exports = router;
