
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Stalls = db.get("Stalls");
	Stalls.index('id');

	var module = {};

	var newStall = function *(venueId, name, floor, rating, pictureUrl) {
		var stall = {};
		stall.id = yield counter.getStallId();
		stall.venueId = venueId;
		stall.name = name;
		stall.floor = floor;
		stall.rating = rating;
		stall.pictureUrl = pictureUrl;
	}

	module.list = function *() {
		return yield Stalls.find();
	}

	module.insert = function *(venueId, name, floor, rating, pictureUrl) {
		return yield Stalls.insert(
			yield newStall(venueId, name, floor, rating, pictureUrl));
	}

	module.findByVenueId = function *(venueId) {
		return yield Stalls.find({venudId: venudId})
	}

	module.findById = function *(id) {
		return yield Stalls.findone({id: id});
	}

	return module;
}