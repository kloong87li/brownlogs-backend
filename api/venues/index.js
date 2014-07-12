var parse = require('co-body');
var Venues = require('../../db').Venues;


var db = [
  {
    name: 'Google - 43',
    description: "a building",
    id: 0
  },
  {
    name: 'Google - CL1',
    description: "a building in CL",
    id: 1
  }
];


/**
 * GET all venues
 */
exports.index = function *(){
  var venues = yield Venues.list();
  this.body = venues;
};


/**
 * GET venue by :venueId.
 */
exports.show = function *(){
  var id = parseInt(this.params.venueId);
  var venue = yield Venues.findById(id);
  this.body = venue;
};


/**
 * POST a new venue
 */
exports.create = function *(){
  var body = yield parse(this);
  var venue = yield Venues.insert(body.name, body.description);
  this.status = 201;
  this.body = venue;
};

