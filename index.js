
/**
 * Module dependencies.
 */

var koa = require('koa');
var responseTime = require('koa-response-time');
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var server = require('koa-static');
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

  app.use(function *(next) {
    this.set('Access-Control-Allow-Origin', "*");
    this.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.set('Access-Control-Allow-Headers', 'Content-Type');
    yield* next;
  })

  // routing
  app.use(router(app));

  app.use(server('static/'));

  // boot
  load(app, __dirname + '/api');

  return app;
}
