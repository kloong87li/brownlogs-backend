var parse = require('co-body');


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
  var msgs = db;
  this.body = msgs;
};


/**
 * GET msg by :msgId
 */
exports.show = function *(){
  var msg = db[this.params.msgId];
  this.body = msg;
};


/**
 * POST a new msg
 */
exports.create = function *(){
  var body = yield parse(this);
  var msg = {
    text: body.text,
    image: body.image,
    author: body.author,
    msg_ref: body.msg_ref,
    id: db.length,
    stall_id: this.params.stall_id,
    upvotes: 0,
    downvotes: 0,
    date: new Date(),
  }
  db.append(msg);
  this.status = 201;
  this.body = msg;
};

