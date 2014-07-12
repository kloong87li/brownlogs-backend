var parse = require('co-body');
var db = require('../../db');

/**
 * GET all venues
 */
exports.reset = function *(){
  var body = yield parse(this);
  if(body.password != "logloglog") {
    this.throw(401);
  }
  yield db.reset();
  this.body = "DONE";
};

