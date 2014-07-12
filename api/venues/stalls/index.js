var parse = require('co-body');
var Stalls = require('../../../db').Stalls;

var db = [
  {
    id: 0,
    venue_id: 0,
    name: 'Stall 1',
    floor: '1',
    picture_url: 'someUrl',
    rating: 5
  },
  {
    id: 1,
    venue_id: 1,
    name: 'Stall 2',
    floor: '2',
    picture_url: 'someUrl',
    rating: 1
  }
];


/**
 * GET all stalls
 */
exports.index = function *(){
  var venueId = parseInt(this.params.venueId);
  var stalls = yield Stalls.findByVenueId(venueId);
  this.body = stalls;
};


/**
 * GET stall by :stallId.
 */
exports.show = function *(){
  var id = parseInt(this.params.stallId);
  var stall = yield Stalls.findById(id);
  this.body = stall;
};


/**
 * POST a new stall
 */
exports.create = function *(){
  var body = yield parse(this);
  var venueId = parseInt(this.params.venueId);
  var stall = yield Stalls.insert
      (venueId, body.name, body.floor, body.pictureUrl);
  this.status = 201;
  this.body = stall;
};

