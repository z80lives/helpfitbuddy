const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
      name: {
	  type: String,
	  required: true
      },
      hash: {
	  type: String,
	  required: true
      },
      type: {
	  type: String,
	  required: true
      },
      image: {
	  type: String,
	  required: false
      },
      activities: [{
	  type: String,
	  required: false
      }],
      dob: [{
	  type: String,
	  required: false
      }],
      location: [{
	  type: String,
	  required: false
      }]
  },
  { timestamps: true },
);
 
const User = mongoose.model('User', userSchema);
 
module.exports =  {User};
