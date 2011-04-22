var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


/**
 * Model: Chat
 */
var Chat = new Schema({
	'whom'		: String,
	'content'	: String
});
Chat.pre('save', function(next){
	if (this.whom == null || this.whom == ''){
		this.whom = 'unknown';
	}
	next();
}


mongoose.model('Chat', Chat);
exports.Chat = function(db){
	//Once define a model via mongoose.model('..', ...), you can access the 
	//same model via mongoose.model('...');
	return db.model('Chat');
};
