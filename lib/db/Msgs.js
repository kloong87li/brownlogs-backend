
module.exports = function(database, counter) {
	var db = database;
	var Counters = counter;
	var Msgs = db.get("Msgs");
	var Stalls = db.get("Stalls");
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
		msg.author = author === "" ? "anon" : author;
		msg.date = new Date();
		msg.msgRef = msgRef;
		return msg;
	}

	module.list = function *() {
		return yield Msgs.find();
	}

	module.insert = function *(stallId, text, image, author, msgRef) {
		yield Stalls.update({id: stallId}, {$inc: {msgCount: 1}})
		return yield Msgs.insert(
			yield newMsg(stallId, text, image, author, msgRef));
	}

	module.findByStallId = function *(stallId) {
		return yield Msgs.find({stallId: stallId}, {sort: {date: -1}});
	}

	module.findById = function *(id) {
		return yield Msgs.findOne({id: id});
	}

	module.upvoteById = function *(id) {
		console.log("incrementing", id);
		return yield Msgs.update({id:id}, {$inc: {upvotes: 1}});
	}

	module.downvoteById = function *(id) {
		return yield Msgs.update({id:id}, {$inc: {downvotes: 1}});
	}

	return module;
}