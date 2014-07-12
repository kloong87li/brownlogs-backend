
var db = require('monk')(process.env.MONGOHQ_URL || 'localhost/brownlog');
var Counters = require('./Counters.js')(db);
var Venues = require('./Venues.js')(db, Counters);
var Stalls = require('./Stalls.js')(db, Counters);
var Msgs = require('./Msgs.js')(db, Counters);

exports.Venues = Venues;
exports.Stalls = Stalls;
exports.Msgs = Msgs;

exports.reset = function *() {
	var Venues = db.get('Venues');
	yield Venues.insert({});
	yield Venues.drop();

	var Stalls = db.get('Stalls');
	yield Stalls.insert({});
	yield Stalls.drop();

	var Msgs = db.get('Msgs');
	yield Msgs.insert({});
	yield Msgs.drop();

	var Counters = db.get('Counters');

	yield Counters.insert({});

	yield Counters.drop();

	yield Counters.insert({
		collection: 'Venues',
		seq: 0.
	});

	yield Counters.insert({
		collection: 'Stalls',
		seq: 0.
	});

	yield Counters.insert({
		collection: 'Msgs',
		seq: 0.
	});
}