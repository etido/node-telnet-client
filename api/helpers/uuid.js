// Constructor
var UUID = function () {

}

// properties and methods
UUID.prototype = {
	generate: function (bytes) {
		if (bytes != undefined) {
			var aux = bytes / 4;
			var generateUUID = '';
			for (var i = 0; i < aux; i++) {
				generateUUID += S4();
			}
			return generateUUID;
		}
		return guid();
	},
	generateTimeBased: function () {
		return new Date().getTime() + this.generate(20);
	}
	
};

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// node.js module export
module.exports = UUID;