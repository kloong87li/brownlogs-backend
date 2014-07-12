
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
	yield Venues.drop();

	Venues.insert({
		"id":0,
		"name":"Default Venue",
		"description":"required"
	});

	var Stalls = db.get('Stalls')
	yield Stalls.drop();

	Stalls.insert({
		"id": 1,
		"building": "Google 43",
		"floor": "2",
		"gender": "male",
		"msgCount": 0,
		"name": "Fancyass Toilet",
		"pictureUrl": "http://tiwibzone.tiwib.netdna-cdn.com/images/royal-toilet-throne.jpg",
		"rating": 3,
		"venueId": 0
	})

	Stalls.insert({
		"id": 2,
		"building": "LinkedIn HQ",
		"floor": "1",
		"gender": "female",
		"msgCount": 0,
		"name": "Toilet",
		"pictureUrl": "http://imgur.com/EEEmVKM.jpg",
		"rating": 4,
		"venueId": 0
	})

	Stalls.insert({
		"id": 3,
		"building": "Outside",
		"floor": "0",
		"gender": "female",
		"msgCount": 0,
		"name": "Porta-potty 9000",
		"pictureUrl": "http://sfappeal.com/wp-content/uploads/2011/05/porta-potty.jpeg",
		"rating": 1,
		"venueId": 0
	})

	Stalls.insert({
		"id": 4,
		"building": "JP's House",
		"floor": "1",
		"gender": "male",
		"msgCount": 0,
		"name": "JP's Throne",
		"pictureUrl": "http://acs7.cortland.edu/irrc/pictures%5C372-Toggenburg%20Men's%20Toilet%20Stall.jpg",
		"rating": 2,
		"venueId": 0
	})

	Stalls.insert({
		"id": 5,
		"building": "Castle in the Sky",
		"floor": "Cloud 9",
		"gender": "male",
		"msgCount": 0,
		"name": "Epiphany Toilet",
		"pictureUrl": "http://i.imgur.com/zVBHdxq.jpg",
		"rating": 5,
		"venueId": 0
	})

	yield db.get('Msgs').drop();

	db.get('Counter');
	yield db.get('Counters').drop();

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