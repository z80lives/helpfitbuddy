const User = require("../models/user").User;
const Friends = require("../models/friends");
const gps = require("./utils/gps.js");

const {friendRequestExists, initFriendRequest} = require("./utils/friends");

const {processUser} = require("./utils/user");


module.exports =  function gymUserServices(app){
    
    app.get("/gymuser/", (req, res) => {
	res.status(200).send("OK");
    });

    app.post("/gymuser/profile", async (req, res) => {
	const _id = req.body._id;
	
	const user = await User.findOne({"_id": _id});
	user.hash= null;

	
	if(user){	    
	    const my_friendships = await initFriendRequest(req.user.user._id);
	    const their_friendships = await initFriendRequest(_id);	 
	    const processedUser = processUser(user)
	    res.status(200).json({
		userData: {
		    ...processedUser
		},
		extra: {
		    "friendMode": true,
		    "isfriend": my_friendships.friends.includes(_id),
		    "friendRequestExists": friendRequestExists(
			my_friendships,
			their_friendships
		    )
		}		
	    });
	}else{
	    ress.status(500).json({"message": "failed to retrieve user"});
	}
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

    app.post("/gymuser/location", async(req, res) => {
	const user = await User.findOne({_id: req.user.user._id});
	const data = req.body;
	user.location = JSON.stringify(data.location);
	
	user.save( err => {
	    if(!err)
		res.status(200).json({
		    "message": "Location updated successfully"
		});
	    else
		res.status(500).json({
		    "message": "Unable to update location",
		    err
		})
	});
	
    });

    
    
    app.get("/gymuser/neighbors", async (req, res) => {
	const userList = await User.find();	
	const processedList = userList.map(el => {
	    var e = el;
	    
	    //calculate age
	    var age="";	    
	    if(el.dob){
		const dob = el.dob[0];		
		age = ((new Date()).getFullYear() - (new Date(dob)).getFullYear() ).toString();;
	    }

	    const distance = 0;

	    //calculate distance -- Horrible code. Don't fix.	    
	    if(el.location.length > 0){
		const userLocation = req.user.user.location;
		if(userLocation.length > 0){
		    try{
			const target_location = JSON.parse(el.location[0]);
			const user_location = JSON.parse(el.location[0]);
			distance = gps.distanceInKmBetweenEarthCoordinates(
			    target_location.coords.latitude,
			    target_location.coords.longitude,
			    user_location.coords.latitude,
			    user_location.coords.longitude
			)
			console.log("Distance", distance);
		    }catch(ex){
			console.error(ex);
		    }
		}
	    }
	    
	    if(el._id != req.user.user._id)
		return {
		    "name": el.name,
		    "image": el.image,
		    "_id": el._id,
		    "age": age,
		    "distance": distance
		};	   
	}).filter(el => el !=null);
	
	res.status(200).json({
	    "message": "Gym user list",
	    data: processedList
	});
    });
}

