var parse = require('co-body');


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
  var stalls = db;
  this.body = stalls;
};


/**
 * GET stall by :stallId.
 */
exports.show = function *(){
  var stall = db[this.params.stallId];
  this.body = stall;
};


/**
 * POST a new stall
 */
exports.create = function *(){
  var body = yield parse(this);
  var stall = {
    name: body.name,
    floor: body.description,
    picture_url: body.picture_url,
    id: db.length,
    venue_id: this.params.venue_id,
    rating: 0
  }
  db.append(stall);
  this.status = 201;
  this.body = stall;
};

