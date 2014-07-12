
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

	stalls.insert({
		"id": 1,
		"building": "Google 43",
		"floor": "2",
		"gender": "male",
		"msgCount": 0,
		"name": "Fancyass Toilet",
		"pictureUrl": "http://tiwibzone.tiwib.netdna-cdn.com/images/royal-toilet-throne.jpg",
		"rating": 0,
		"venueId": 0
	})

	stalls.insert({
		"id": 2,
		"building": "Old School",
		"floor": "0",
		"gender": "female",
		"msgCount": 0,
		"name": "Fancyass Toilet",
		"pictureUrl": "http://img3.wikia.nocookie.net/__cb20070206165714/uncyclopedia/images/1/18/Hole_In_The_Ground.JPG",
		"rating": 0,
		"venueId": 0
	})

	stalls.insert({
		"id": 3,
		"building": "Outside",
		"floor": "0",
		"gender": "female",
		"msgCount": 0,
		"name": "Porta-potty 9000",
		"pictureUrl": "http://sfappeal.com/wp-content/uploads/2011/05/porta-potty.jpeg",
		"rating": 0,
		"venueId": 0
	})

	stalls.insert({
		"id": 4,
		"building": "JP's House",
		"floor": "1",
		"gender": "male",
		"msgCount": 0,
		"name": "JP's Throne",
		"pictureUrl": "http://acs7.cortland.edu/irrc/pictures%5C372-Toggenburg%20Men's%20Toilet%20Stall.jpg"
		"rating": 0,
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