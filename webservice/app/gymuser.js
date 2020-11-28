const User = require("../models/user").User;


module.exports =  function gymUserServices(app){
    app.get("/gymuser/", (req, res) => {
	res.status(200).send("OK");
    });

    
    //retrieve profile picture given id (GLOBAL)
    app.get("/gymuser/profile_picture", async (req, res) => {
	const user = await User.findOne({"_id": req.user.user._id});
	res.status(200).json({"message": "Picture found", image: user.image});
    });


    //set profile picture
    app.post("/gymuser/profile_picture", async (req, res) => {
	const user = await User.findOne({_id: req.user.user._id});	
	const img = req.body.base64;

	user.image = img;
	
	await user.save(error => {
	    if(!error)
		res.status(200).json({"message": "Successfully saved"});
	    else
		res.status(500).json({"message": "Unable to upload profile picture"})
	}).catch(err => {
	    console.error(err);
	    res.status(500).json({"message": "Server error"})
	});	
    });

    app.post("/gymuser/activities", async (req, res) => {
	//const user = req.locals.currentUser;
	const user = await User.findOne({_id: req.user.user._id});
	
	const data = req.body;
	user.activities = data.activities;

	user.save( err => {
	    if(!err)
		res.status(200).json({
		    "message": "Successfully updated",
		    "user": user
		});
	    else
		res.status(500).json({
		    "message": "Unable to update activity"
		})
	});

    });
    
    app.get("/gymuser/neighbors", async (req, res) => {
	const userList = await User.find();
	const processedList = userList.map(el => {
	    var e = el;	    
	    if(el._id != req.user.user._id)
		return {
		    "name": el.name,
		    "image": el.image,
		    "_id": el._id,
		    "age": "21",
		    "distance": "13"
		};	   
	}).filter(el => el !=null);
	
	res.status(200).json({
	    "message": "Gym user list",
	    data: processedList
	});
    });
}

