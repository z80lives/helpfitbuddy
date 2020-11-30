const validate = require("../utils/validate.js");
const Friends = require("../../models/friends.js");
const User = require("../../models/user.js").User;

const {processUser, getDistance} = require("../utils/user.js");

const {initFriendRequest,
       friendRequestExists,
       hasPendingRequest,
       removeFriendRequest,
       addFriend,
       populateFriendList
      } = require("../utils/friends");

module.exports = function friendServices(app){
    app.get("/gymuser/friends", async (req, res) => {
	const friendship = await initFriendRequest(req.user.user._id)

	const myLocation = req.user.user.location.length==0?[]:JSON.parse(req.user.user.location);

	const data = await friendship
	      .populate("friends", ["name", "dob", "activities", "location", "occupation", "country"]).execPopulate();
	
	const friends = data.friends
	      .map(processUser)
	      .map(friend => ({
		  ...friend,
		  distance: getDistance(friend.location, myLocation).toString(),
	      }) );

	
	res.json({
	    "message": "Friend list",
	    friends,
	    myLocation
	});
    });

    app.get("/gymuser/requests", async (req, res) => {
	const friendship = await initFriendRequest(req.user.user._id);

	const data = await friendship.populate("friend_requests").execPopulate();
	const processedList =
	      data
	      .friend_requests
	      .map(processUser);
	
	res.json({
	    "message": "Pending requests",
	    friend_requests: processedList
	});
    });

    //send friend request
    app.post("/gymuser/request", async (req, res) => {
	const _id = req.user.user._id;
	const other_user = await User.findOne({_id: req.body._id});
	const friendship = await initFriendRequest(req.body._id);
	console.log("Body", req.body);

	if(req.body._id == req.user.user._id){
	    res.status(500).json({
		"message": "Cannot send friend request to self"
	    });
	    return
	}

	//delete other_user["image"];	
	//console.log(other_user)
	if(!other_user){
	    res.status(500).json({"message": "User does not exist "+req.body._id, sent: req.body});
	    return;	    
	}

	//friendship.friend_requests.
	if(friendship.friend_requests.includes(_id)){
	    res.json({"message": "Friend request already sent to "+other_user.name});
	}else{
	    friendship.friend_requests.push(_id);
	    await friendship.save();	    
	    res.json({
		requests: friendship.friend_requests
	    })
	}
    });

    //accept request
    app.post("/gymuser/request/accept", async ( req, res) => {
	const ownFriendship = await initFriendRequest(req.user.user._id);
	const senderFriendship = await initFriendRequest(req.body._id);

	if(!hasPendingRequest(ownFriendship, req.body._id) ){
	    res.status(500)
		.json({"message": "No pending friend request from the user",
		       ownFriendship
		      });
	}else{
	    addFriend(ownFriendship, req.body._id);
	    addFriend(senderFriendship, req.body._id);
	    removeFriendRequest(ownFriendship, senderFriendship);
	    await ownFriendship.save();
	    await senderFriendship.save();
	    res.json({"message": "Friend request accepted",
		      ownFriendship,
		      senderFriendship
		     })
	}
    });


    app.delete("/friends", async (req, res) => {
	await Friends.remove({}, function(err) { 
	    console.log('collection removed') 
	});	
	res.json({"message": "Friends data cleared"});
    });
}
