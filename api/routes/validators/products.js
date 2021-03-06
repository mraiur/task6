// TODO use proper validation
module.exports = {
	productData: function(req, res, next) {

		let data = req.body;
		let errors = [];

		if( !data.name || data.name.length <= 3)
		{
			errors.push({field: 'name', message: `Missing name or length less than 3 symbols: ${data.name}`})
		}

		if( !data.price || isNaN(parseFloat(data.price)) )
		{
			errors.push({field: 'price', message: `Missing or invalid price: ${data.price}`})
		}

		if( !data.category || data.category.length <= 3)
		{
			errors.push({field: 'category', message: `Missing or invalid category: ${data.category}`})
		}

		if(errors.length>0)
		{
			return res.status(400).send({success: false, validation: errors});
		}
		next();
	}
};

