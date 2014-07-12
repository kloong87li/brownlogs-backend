var parse = require('co-body');
var Msgs = require('../../../../db').Msgs;

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
  var stallId = parseInt(this.params.stallId);
  var msgs = yield Msgs.findByStallId(stallId);
  this.body = msgs;
};


/**
 * GET msg by :msgId
 */
exports.show = function *(){
  var msgId = parseInt(this.params.msgId);
  var msg = yield Msgs.findById(msgId);
  this.body = msg;
};


/**
 * POST a new msg
 */
exports.create = function *(){
  var body = yield parse(this);
  var stallId = parseInt(this.params.stallId);
  var msg = yield Msgs.insert
      (stallId, body.text, body.image, body.author, body.msgRef);
  this.status = 201;
  this.body = msg;
};
