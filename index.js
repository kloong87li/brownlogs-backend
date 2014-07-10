
/**
 * Module dependencies.
 */

var koa = require('koa');
var responseTime = require('koa-response-time');
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var load = require('./lib/load');
var jsonFilter = require('koa-json-filter');


/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Expose `api()`.
 */

module.exports = api;

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function api(opts) {
  opts = opts || {};
  var app = koa();

  // logging
  if ('test' != env) app.use(logger());

  // x-response-time
  app.use(responseTime());

  // compression
  app.use(compress());

  //json response formatting and filtering
  app.use(jsonFilter());

  // routing
  app.use(router(app));

  // boot
  load(app, __dirname + '/api');

  return app;
}
