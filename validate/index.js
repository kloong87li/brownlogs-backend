var validator = require('validator');

exports.hasField = function(body, field) {
	return field in body;
}

exports.hasFields = function(body, field) {
	for(var i = 0 ; i < field.length; i++) {
		if (!(field[i] in body)) {
			return false
		}
	}
	return true;
}

exports.hasFieldsThrow = function(ctx, body, fields) {
	if(!exports.hasFields(body, fields)) {
		ctx.throw(400);
	}
}

exports.toInt = function(ctx, str) {
	if(!(validator.isInt(str))) {
		ctx.throw(400);
	}
	return validator.toInt(str);
}