var Connection = require('./connection.js');
$(document).ready(function () {
	var connection = new Connection({id:'server', target:'client'});
	connection.init().then(function () {
		$('body').html('<div class="subBlock center role-small"><span class="centered-small">Connected</span></div>');
	});
});
