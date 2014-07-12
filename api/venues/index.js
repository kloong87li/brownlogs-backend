var parse = require('co-body');


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
  var venues = db;
  this.body = venues;
};


/**
 * GET venue by :venueId.
 */
exports.show = function *(){
  var venue = db[this.params.venueId]
  this.body = venue;
};


/**
 * POST a new venue
 */
exports.create = function *(){
  var body = yield parse(this);
  var venue = {
    name: body.name,
    description: body.description,
    id: db.length
  }
  db.append(venue);
  this.status = 201;
  this.body = venue;
};

