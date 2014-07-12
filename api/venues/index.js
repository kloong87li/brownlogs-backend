var parse = require('co-body');
var Venues = require('../../lib/db').Venues;
var validate = require('../../lib/validate');

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
  this.set('Access-Control-Allow-Origin', "*");
  this.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  this.set('Access-Control-Allow-Headers', 'Content-Type');
  this.body = {venues: venues};
};


/**
 * GET venue by :venueId.
 */
exports.show = function *(){
  var id = validate.toInt(this, this.params.venueId);
  var venue = yield Venues.findById(id);
  if(venue == null) {
    this.throw(404);
  }
  this.body = venue;
};


var createRequired = ['name', 'description'];

/**
 * POST a new venue
 */
exports.create = function *(){
  var body = yield parse(this);
  validate.hasFieldsThrow(this, body, createRequired);
  var venue = yield Venues.insert(body.name, body.description);
  this.status = 201;
  this.body = venue;
};

