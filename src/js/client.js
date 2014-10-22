var Connection = require('./connection.js');
$(document).ready(function () {
	var connection = new Connection({id:'client', mute: true});
	connection.init().then(function () {
		$('body').html('connected');
		connection.requestCall().then(function () {
			$('body').html('Calling');
			connection.on('call', function () {
				$('body').html('Call Connected');
			});
		});
	});
});
