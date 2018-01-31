var env = process.env.NODE_ENV || 'dev';

var express = require('express');
var path = require('path');
var app = express();
var basicAuth = require('basic-auth-connect');

if ('dev' == env) {
	console.log('Your are in dev environnement. Use the grunt serve task instead.');
	console.log('Use NODE_ENV=prod node app.js instead if you want to run a server.');
	process.exit();
}
if ('prod' == env) {
	app.use(basicAuth('user', '2300'));
	app.set('port', 3000);

	app.use(express.static(path.join(__dirname, 'dist')));

	// Listen for requests
	var server = app.listen(app.get('port'), function() {
	  var port = server.address().port;
	  console.log('Magic happens on port ' + port);
});
}
