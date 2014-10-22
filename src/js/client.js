var Connection = require('./connection.js');
$(document).ready(function () {
	var connection = new Connection('client').then(function () {
		alert('connected');
	});
});
