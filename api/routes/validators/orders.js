const Enums = require('../../enum/OrderStatus');

// TODO use proper validation
module.exports = {
	orderData: function(req, res, next) {
		let data = req.body;
		let errors = [];

		if( !data.products || data.products.length === 0)
		{
			errors.push({field: 'products', message: `Missing products : ${data.products}`})
		}

		if( !data.status || (data.status && Enums.OrderStatus.hasOwnProperty(data.status) === false ) )
		{
			errors.push({field: 'status', message: `Missing or invalid status: ${data.status}`})
		}

		if(errors.length>0)
		{
			return res.send({success: false, validation: errors});
		}
		next();
	},

	statusChange: function(req, res, next) {
		let data = req.body;
		let errors = [];

		if( !data.status || (data.status && Enums.OrderStatus.hasOwnProperty(data.status) === false ) )
		{
			errors.push({field: 'status', message: `Missing or invalid status: ${data.status}`})
		}

		if(errors.length>0)
		{
			return res.send({success: false, validation: errors});
		}
		next();
	}
};