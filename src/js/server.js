var Connection = require('./connection.js');
$(document).ready(function () {
	var connection = new Connection({id:'server', target:'client'});
	connection.init().then(function () {
		$('body').html('connected');
	});
});
