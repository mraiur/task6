// TODO use proper validation
module.exports = {
	isAuth: function(req, res, next) {
		if(req.session.user)
		{
			return next();
		}
		else
		{
			return res.send({success: false, message: 'Not logged in!'});
		}
	},
	login: function(req, res, next) {

		let data = req.body;
		let errors = [];

		if( !data.username || data.username.length <= 3)
		{
			errors.push({field: 'username', message: `Missing username or length less than 3 symbols: ${data.username}`})
		}

		if( !data.password || data.password.length <= 3)
		{
			errors.push({field: 'password', message: `Missing or invalid password`})
		}

		if(errors.length>0)
		{
			return res.send({success: false, validation: errors});
		}
		next();
	}
};

