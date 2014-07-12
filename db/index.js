
var db = require('monk')(process.env.MONGOHQ_URL || 'localhost/brownlog');
var Counters = require('./Counters.js')(db);
var Venues = require('./Venues.js')(db, Counters);
var Stalls = require('./Stalls.js')(db, Counters);
var Msgs = require('./Msgs.js')(db, Counters);

exports.Venues = Venues;
exports.Stalls = Stalls;
exports.Msgs = Msgs;