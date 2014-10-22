;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	appid : "7441f4c7-76b2-49ad-ad62-f40957eeab88"
}

},{}],2:[function(require,module,exports){
$(document).ready(function () {
	var credentials = require('./credentials.json');
    var appid = credentials.appid;
    var call = null;

    // create a client object using the App ID value from Step 2
    var client = respoke.createClient({
	appId: appid,
	developmentMode: true
    });

    // listen for the 'connect' event
    client.listen('connect', function () {
	$("#status").html("Connected to Respoke!");
    });

    // listen for incoming messages
    client.listen('message', function(evt) {
	$("#messages").append("<li>" + evt.message.message + "</li>");
    });

    // listen for and answer incoming calls
    client.listen('call', function(evt) {
	call = evt.call;
	if (call.initiator !== true) {
            call.answer({constraints: {audio: true, video: false}});
            call.listen('hangup', function () {
		call = null;
            });
	}
    });

    // now connect when the user clicks the 'Connect' button
    $("#doLogin").click(function () {
	var endpoint =  $("#endpoint").val();
	client.connect({
            endpointId: endpoint
	});
    });

    // send a message to the far-end party
    $("#sendMessage").click(function (){

	// get the recipient name
	var remote = $("#remoteId").val();

	// make an endpoint for that recipient
	var endpoint = client.getEndpoint({ id : remote});

	// grab the text to send
	var messageText = $("#textToSend").val();

	// send it
	endpoint.sendMessage({ message : messageText });
    });

    // Create a call
    $("#makeCall").click(function () {
	var endpoint = client.getEndpoint({ id : $("#remoteId").val()});
//	call = endpoint.startAudioCall({recieveOnly : true});
	call = endpoint.startAudioCall({sendOnly: true,
 					disableTurn: true,
					onError: function (evt) {
							console.log("Had an error");
							console.log(evt);
							}
							});


    });

    // Hang up the call
    $("#endCall").click(function () {
	if (call) {
            call.hangup();
            call = null;
	}
    });
});

},{"./credentials.json":1}]},{},[2])
;