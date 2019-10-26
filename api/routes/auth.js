const express = require('express');
const router = express.Router();
const Database = require('../library/Database');
const AuthValidator = require('./validators/auth');

router.post('/login', AuthValidator.login, function(req, res, next) {
	let user = Database.getUserByCredentials(req.body.username, req.body.password);
	console.log("user", user, req.body.username, req.body.password);
	if( user )
	{
		req.session.user = user;
		return res.json(user);
	}
	return res.json({success: false, message: 'Invalid username and/or password'});
});

module.exports = router;
