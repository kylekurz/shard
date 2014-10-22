var Connection = require('./connection.js');
$(document).ready(function () {
	var connection = new Connection({id:'client', mute: true});
	connection.init()
		.then(function () {
			$('body').html('<div class="subBlock center role-small"><span class="centered-small">Connected to Respoke</span></div>');
			return connection.requestCall();
		})
		.then(function () {
			$('body').html('<div class="subBlock center role-small"><span class="centered-small">Calling</span></div>');
			connection.on('call', function () {
				$('body').html('<div class="subBlock center role-small"><span class="centered-small">Streaming</span></div>');
			});
		});
});
