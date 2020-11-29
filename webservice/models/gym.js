const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema({
    name: {
	type: String,
	required: true 	
    },
    openTime: {
	type: String,
	required: true
    },
    closeTime: {
	type: String,
	required: true
    },
    location: {
	latitude: {
	    type: String,
	    required: true
	},
	longitude: {
	    type: String,
	    required: true
	},
	required: false
    },
    image: {
	type: String,
	required: false
    },
    subscribers: [{
	type: String,
	required: false
    }],
    likes: {
	type: Number,
	required: false	
    },
    creator: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
    }
});

const Gym = mongoose.model('Gym', GymSchema);
 
module.exports =  Gym;
