
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Venues = db.get('Venues');
	Venues.index('id');

	var module = {};

	var newVenue = function *(name, description) {
		var venue = {};
		venue.id = yield counter.getVenueId();
		venue.name = name;
		venue.description = description;
		return venue;
	}

	module.list = function *() {
		return yield Venues.find();
	}

	module.insert = function *() {
		return yield Venues.insert(yield newVenue("v1", "d1"));
	}

	module.findById = function *(id) {
		return yield Venues.findOne({id: id});
	}

	return module;
}