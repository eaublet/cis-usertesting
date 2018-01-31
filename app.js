var basicAuth = require('basic-auth-connect');
var port = process.env.PORT || 9000;
var grunt = require('grunt');
var env = process.env.NODE_ENV || 'dev';
var server = require('http').Server(app);
var open = require("open");
var express = require('express')
var app = express();
var sio = require('socket.io');
var colors = require('colors');
var io = sio.listen(app.listen(port));
var session = require('express-session')



if ('dev' == env) {
	console.log(colors.red('Your are in dev environnement. Use the grunt serve task instead.'));
	console.log(colors.grey('Use NODE_ENV=prod node app.js instead if you want to run a server.'))
	process.exit();
}
if ('prod' == env) {
	app.use(basicAuth('aldo', '2300'));
	app.use(express.static(__dirname + '/dist'));

	console.log(colors.yellow('Now listening on port ' + port));

}

