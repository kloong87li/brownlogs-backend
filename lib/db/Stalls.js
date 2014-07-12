
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Stalls = db.get("Stalls");
	Stalls.index('id');

	var module = {};

	var newStall = function *(venueId, name, building, floor, gender, pictureUrl) {
		var stall = {};
		stall.id = yield counter.getStallId();
		stall.venueId = venueId;
		stall.name = name;
		stall.building = building;
		stall.floor = floor;
		stall.rating = 0;
		stall.pictureUrl = pictureUrl;
		stall.gender = gender;
		return stall;
	}

	module.list = function *() {
		return yield Stalls.find();
	}

	module.insert = function *(venueId, name, building, floor, gender, pictureUrl) {
		return yield Stalls.insert(
			yield newStall(venueId, name, building, floor, gender, pictureUrl));
	}

	module.findByVenueId = function *(venueId) {
		return yield Stalls.find({venueId: venueId})
	}

	module.findById = function *(id) {
		return yield Stalls.findOne({id: id});
	}

	return module;
}