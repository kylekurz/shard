/**
 * @module connection
 * Handles connection to the respoke api
 */

var Promise = require('bluebird');
var credentials = require('./credentials.json');

var callMessage = "callMe";

/**
 * Connects as a client or a server, returns a promise that resolves when
 * @param {string} params.id - 'client' or 'server'
 * @param {String} params.target - 'server' or 'client
 */
function Connection (params) {
	params = params || {};
	var id = this.id = params.id || 'client';
	this.target = params.target || 'server';

	return new Promise(function (resolve, reject) {
		var appid = credentials.appid;
		
		this.client = respoke.createClient({
			appId: appid,
			developmentMode: true
		});
		
		this.client.listen('connect', function () {
			resolve(arguments);
		});
		
		this.client.connect({
			endpointId : id
		});
	}.bind(this));

};

/**
 * Send message to target
 */
Connection.prototype.send = function (message) {
	var target = this.client.getEndpoint({id: this.target});
	
	target.sendMessage({message : message});
};

/** 
 * request a call from the 'target' endpoint
 */
Connection.prototype.requestCall = function () {
	this.sendMessage(callMessage);
};



module.exports = Connection;
