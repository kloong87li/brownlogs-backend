var parse = require('co-body');
var Msgs = require('../../../../lib/db').Msgs;
var validate = require('../../../../lib/validate');

var db = [
  {
    id: 0,
    stall_id: 0,
    text: 'my idea',
    image: 'someImage',
    upvotes: 9001,
    downvotes: 5,
    author: 'Ken',
    date: new Date(),
    msg_ref: 1
  },
  {
    id: 1,
    stall_id: 1,
    text: 'my idea 2',
    image: 'someImage 2',
    upvotes: 9,
    downvotes: 1,
    author: 'JP',
    date: new Date(),
    msg_ref: undefined
  }
];


/**
 * GET all msgs
 */
exports.index = function *(){
  var stallId = validate.toInt(this, this.params.stallId);
  var msgs = yield Msgs.findByStallId(stallId);
  this.body = msgs;
};


/**
 * GET msg by :msgId
 */
exports.show = function *(){
  var msgId = validate.toInt(this, this.params.msgId);
  var msg = yield Msgs.findById(msgId);
  this.body = msg;
};


var createRequired = ['text', 'author'];

/**
 * POST a new msg
 */
exports.create = function *(){
  var body = yield parse(this);
  var stallId = validate.toInt(this, this.params.stallId);
  validate.hasFieldsThrow(this, body, createRequired);
  var msg = yield Msgs.insert
      (stallId, body.text, body.image, body.author, body.msgRef);
  this.status = 201;
  this.body = msg;
};


/**
 * POST upvote a msg
 */
exports.upvote = function *(){
  var msgId = validate.toInt(this, this.params.msgId);
  var msg = yield Msgs.upvoteById(msgId);
  this.status = 201;
  this.body = msg;
};


/**
 * POST downvote a msg
 */
exports.downvote = function *(){
  var msgId = validate.toInt(this, this.params.msgId);
  var msg = yield Msgs.downvoteById(msgId);
  this.status = 201;
  this.body = msg;
};