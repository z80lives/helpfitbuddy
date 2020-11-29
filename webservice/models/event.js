const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
	type: String,
	required: true
    },
    date: {
	type: String,
	required: true
    },
    time: {
	type: String,
	required: true
    },
    gym: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Gym',
	required: false
    },
    type: {
	type: String,
	required: false,
	default: "general"
    },
    invite: {
	type: String,
	required: false,
	default: "public"
    },
    creator: {
	type: mongoose.Schema.Types.ObjectId,
	ref: "User",
	required: true
    },
    participants: [{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: "User",
	    required: false
    }]
},
{timestamps: true}
);

module.exports  = mongoose.model("Event", EventSchema);

