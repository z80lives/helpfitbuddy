const validate = require("../utils/validate.js");
const Gym = require("../../models/gym.js");

module.exports = function gymServices(app){
    //get current gym info
    app.post("/gym", (req, res) => {
	const data = req.body;
	const expected_keys = ["name", "openTime", "closeTime", "location"];
	
	if (!validate.handleValidateResponse(req, res, expected_keys) )
	    return false;
		
	const newGym = new Gym({
	    ...data,
	    creator: req.user.user._id
	});

	newGym.save( (err) => {
	    if(!err)
		res.json({"message": "AOK", gym: newGym});
	    else
		res.status(500).json({"message": err.message});
	});
    });
    

    app.get("/gym", (req, res) => {
	const gymList = Gym.find({}).exec( (err, gym) => {
	    res.json({"message": "ok", data: gym});	    
	});
    });

    app.get("/gym/user", async (req, res) => {
	const gym = await Gym.findOne({creator: req.user.user._id});

	if(gym == null){
	    res.status(200).json({
		message: "User does not have a gym"
	    });
	}else{
	    res.status(200).json({
		message: "User gym found",
		data: gym
	    });
	}
    });

    app.delete("/gym", async (req, res) => {
	await Gym.remove({}, function(err) { 
	    console.log('collection removed') 
	});	
	res.json({"message": "Gym data cleared"});
    });
}
	   
