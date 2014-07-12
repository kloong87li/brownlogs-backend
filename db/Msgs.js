
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Msgs = db.get("Msgs");
	Msgs.index('id');

	var module = {};

	var newMsg = function *(stallId, text, image, author, msgRef) {
		var msg = {};
		msg.id = yield counter.getMsgId();
		msg.stallId = stallId;
		msg.text = text;
		msg.image = image;
		msg.upvotes = 0;
		msg.downvotes = 0;
		msg.author = author;
		msg.date = new Date();
		msg.msgRef = msgRef;
		return msg;
	}

	module.list = function *() {
		return yield Msgs.find();
	}

	module.insert = function *(stallId, text, image, author, msgRef) {
		return yield Msgs.insert(
			yield newMsg(stallId, text, image, author, msgRef))
	}

	module.findByStallId = function *(stallId) {
		return yield Msgs.find({stallId: stallId})
	}

	module.findById = function *(id) {
		return yield Msgs.findOne({id: id});
	}

	return module;
}