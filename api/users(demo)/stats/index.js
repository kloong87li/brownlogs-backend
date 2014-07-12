/**
 * This file illustrates how you may map
 * single routes using config.json instead
 * of resoure based routing.
 */

var stats = {
  requests: 100000,
  average_duration: 52,
  uptime: 123123132
};

/**
 * GET all stats.
 */

exports.all = function *(){
	var venues = yield db.list();
	// var n = yield db.insert();
	this.body = venues;
  // this.body = venues;
};

/**
 * GET a single stat.
 */

exports.get = function *(){
	var venue = yield db.find(6);
  this.body = venue;
};

exports.insert = function *(){
	this.body = yield db.insert();
};