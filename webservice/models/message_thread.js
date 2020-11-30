const mongoose = require("mongoose");
 
const messageThreadSchema = new mongoose.Schema(
    {
	messages: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "Messages"
	}],
	participants: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "User"
	}],
	type: {
	    type: String,
	    default: "private"
	}
    }
);


const MessageThread = mongoose.model('MessageThread', messageThreadSchema);
 
module.exports =  MessageThread;
