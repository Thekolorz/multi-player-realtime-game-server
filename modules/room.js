'use strict';

var MAX_NUM_OF_PLAYERS = 3;

var Room = function(roomID) {
	this.playerConnections = [];
	this.roomID = roomID;
};

Room.prototype.addPlayerConnection = function (connection) {
	var players = this.playerConnections.length,
		completed;

	if (players < MAX_NUM_OF_PLAYERS) {
		var playerPosition = players;
		players = this.playerConnections.push(connection);
		console.log('NEW PLAYER IN ROOM', this.roomID, '. TOTAL: ', players);

		if (players < MAX_NUM_OF_PLAYERS) {
			this.sendMessageToAllExcept('NEW PLAYER IN ROOM', playerPosition);
			completed = false;
		} else {
			this.sendMessageToAll('ROOM COMPLETED');
			completed = true;
		}
	} else {
		completed = true;
	}

	return completed;
};

Room.prototype.sendMessageToAll = function (message) {
	for (var i = 0, len = this.playerConnections.length; i < len; i++) {
		var conn = this.playerConnections[i];

		console.log('MENSSAGE SENT TO ', i, '>>>>', message);
		conn.send(message);
	}
};

Room.prototype.sendMessageToAllExcept = function (message, player) {
	for (var i = 0, len = this.playerConnections.length; i < len; i++) {
		if (i !== player) {
			var conn = this.playerConnections[i];

			console.log('MENSSAGE SENT TO ', i, '>>>>', message);
			conn.send(message);
		}
	}
};

module.exports = Room;