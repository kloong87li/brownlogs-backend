
var db = require('monk')(process.env.MONGOHQ_URL || 'localhost/brownlog');
var Counters = require('./Counters.js')(db);
var Venues = require('./Venues.js')(db, Counters);
var Stalls = require('./Stalls.js')(db, Counters);
var Msgs = require('./Msgs.js')(db, Counters);

exports.Venues = Venues;
exports.Stalls = Stalls;
exports.Msgs = Msgs;

exports.reset = function *() {
	yield db.get('Venues').drop();
	yield db.get('Stalls').drop();
	yield db.get('Msgs').drop();
	yield db.get('Counters')

	var Counters = db.get('Counters');

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