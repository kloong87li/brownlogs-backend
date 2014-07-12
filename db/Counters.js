
module.exports = function(database) {
	var db = database;
	var Counters = db.get('Counters');

	var module = {};

	var getId = function *(collection) {
		var counter = yield Counters.findAndModify(
			{collection: collection},
			{$inc: {seq: 1}}
		);
		return counter.seq;
	}

	module.getVenueId = function *() {
		return yield getId("Venues");
	}

	module.getStallId = function *() {
		return yield getId("Stalls");
	}

	module.getMsgId = function *() {
		return yield getId("Msgs");
	}

	return module;
}