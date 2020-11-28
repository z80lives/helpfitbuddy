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
    }
});

const Gym = mongoose.model('Gym', userSchema);
 
module.exports =  Gym;

