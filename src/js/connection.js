/**
 * @module connection
 * Handles connection to the respoke api
 */

var Promise = require('bluebird');
var credentials = require('./credentials.json');
var util = require('util');
var events = require('events');
var callMessage = "callMe";

/**
 * Connects as a client or a server, returns a promise that resolves when
 * @param {string} params.id - 'client' or 'server'
 * @param {String} params.target - 'server' or 'client
 */
function Connection (params) {
	events.EventEmitter.call(this);
	params = params || {};
	this.id = params.id || 'client';
	this.target = params.target || 'server';
	this.mute = params.mute || false;
};

util.inherits(Connection, events.EventEmitter);

Connection.prototype.init = function () {
	return new Promise(function (resolve, reject) {
		var appid = credentials.appid;
		
		this.client = respoke.createClient({
			appId: appid,
			developmentMode: true
		});
		
		this.client.once('connect', function () {
			resolve(arguments);
		}.bind(this));
		
		this.client.connect({
			endpointId : this.id
		});
		this.client.listen('message', this._messageHandler.bind(this));
		this.client.listen('call', this._callHandler.bind(this));

	}.bind(this));

};

/**
 * Send message to target
 */
Connection.prototype.send = function (message) {
	return new Promise(function(resolve, reject) {
		var target = this.client.getEndpoint({id: this.target});
		target.sendMessage({message : message, onSuccess: resolve, onError: reject});
	}.bind(this));
};
/** 
 * request a call from the 'target' endpoint
 */
Connection.prototype.requestCall = function () {
	return this.send(callMessage).then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
};


Connection.prototype._messageHandler = function (event) {
	switch(event.message.message) {
	case callMessage:
		return this.startCall(event.message.endpointId)
			.then(function (response) {
				console.log(response);
			}).catch(function (error) {
				console.log(error);
			});
		;
		break;
	}
	
};

Connection.prototype._callHandler = function (event) {
	this.emit('call');
	var call = event.call;
	if (call.initiator !== true) {
        call.answer({constraints: {audio: true, video: false}, onConnect: function () {
			// debugger;
			if (this.mute) {
				call.outgoingMedia.muteAudio();
				this.client.calls[0].outgoingMedia.muteAudio();
			}
		}.bind(this)});
        call.listen('hangup', function () {
			call = null;
        });
	}
};

Connection.prototype.startCall = function (endpointId) {
	return new Promise(function (resolve, reject) {
		var target = this.client.getEndpoint({id: endpointId});		
		target.startAudioCall({onSuccess: resolve, onError: reject});
	}.bind(this));
};


module.exports = Connection;
