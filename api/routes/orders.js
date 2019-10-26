let express = require('express');
let router = express.Router();
let Database = require('../library/Database');
let OrderValidator = require('./validators/orders');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const orders = Database.getAllOrders();
  res.json(orders);
});

router.post('/', OrderValidator.orderData, function(req, res) {
  let order = Database.createOrder(req.body);
  if( order )
  {
    return res.json(order);
  }
  return res.json({success: false, message: 'Problem creating order'});
});

router.put('/:id', OrderValidator.statusChange, function(req, res) {
  let id = parseInt(req.params.id, 10);
  let data = req.body;
  if( Database.updateOrderStatus(id, data.status) )
  {
    return res.json(Database.getOrder(id));
  }
  return res.json({success: false, message: 'Problem updating order status'});
});


module.exports = router;
