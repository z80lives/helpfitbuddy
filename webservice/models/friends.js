const mongoose = require("mongoose");
 
const friendSchema = new mongoose.Schema(
    {
	user: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'User'	    
	},
	friends: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'User'
	}],
	friend_requests: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "User"
	}]
    }
);
 
const Friends = mongoose.model('Friends', friendSchema);
 
module.exports =  Friends;
