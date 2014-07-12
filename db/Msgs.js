
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Msgs = db.get("Msgs");
	Msgs.index('id');

	var module = {};

	var newMsg = function *(stallId, text, image, upvotes, downvotes, author, date, msgRef) {
		var msg = {};
		msg.id = yield counter.getMsgId();
		msg.stallId = stallId;
		msg.text = text;
		msg.image = image;
		msg.upvotes = upvotes;
		msg.downvotes = downvotes;
		msg.author = author;
		msg.date = new Date();
		msg.msgRef = msgRef;
	}

	module.list = function *() {
		return yield Msgs.find();
	}

	module.insert = function *(stallId, text, image, upvotes, downvotes, author, date, msgRef) {
		return yield Msg.insert(
			yield newMsg(stallId, text, image, upvotes, downvotes, author, date, msgRef))
	}

	module.findByStallId = function *(stallId) {
		return yield Msg.find({stallId: stallId})
	}

	module.findById = function *(id) {
		return yield Msg.findone({id: id});
	}

	return module;
}