const mongoose = require("mongoose");

const messageInboxSchema = new mongoose.Schema(
    {
	message_threads: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "MessageThread"
	}],
	user: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "User"
	}
    }
);


const MessageInbox = mongoose.model('MessageInbox', messageInboxSchema);
 
module.exports =  MessageInbox;
