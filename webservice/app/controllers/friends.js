const validate = require("../utils/validate.js");
const Friends = require("../../models/friends.js");
const User = require("../../models/user.js").User;

const {initFriendRequest,
       friendRequestExists,
       hasPendingRequest,
       removeFriendRequest,
       addFriend
      } = require("../utils/friends");

module.exports = function friendServices(app){
    app.get("/gymuser/friends", (req, res) => {
	res.json({
	    "message": "Friends"
	});
    });

    app.get("/gymuser/requests", async (req, res) => {
	const friendship = await initFriendRequest(req.user.user._id);
	res.json({
	    "message": "Pending requests",
	    friend_requests: friendship.friend_requests
	});
    });

    //send friend request
    app.post("/gymuser/request", async (req, res) => {
	const _id = req.user.user._id;
	const other_user = await User.findOne({_id: req.body._id});
	const friendship = await initFriendRequest(req.body._id);
	
	//delete other_user["image"];	
	//console.log(other_user)
	if(!other_user){
	    res.status(500).json({"message": "User does not exist"});
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
