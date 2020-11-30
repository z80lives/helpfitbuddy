const Friends = require("../../models/friends.js");
const User = require("../../models/user.js");

const initFriendRequest = async (_id) => {
    const requests = await Friends.findOne({user: _id});
    if(requests == null){ //first time user
	const newFriendRequest =  new Friends({
	    user: _id,
	});
	
	await newFriendRequest.save();

	return newFriendRequest;
    }else{
	return requests;
    };
}

const populateFriendList = async (friendship) => {
    return await friendship.populate("friends").execPopulate();
}

const removeFriendRequest = (friendship1, friendship2) => {
    friendship1.friend_requests =
	friendship1.friend_requests.filter(el => el == friendship2.user);
    
    friendship2.friend_requests =
	friendship2.friend_requests.filter(el => el == friendship1.user);    
};

const addFriend = (friendship, user_id) =>{
    friendship.friends.push(user_id);
};

//Checks whether friend reqeust exists in either direction
const friendRequestExists = (friendship1, friendship2) => {
    return friendship1.friend_requests.includes(friendship2.user)
	||
	friendship2.friend_requests.includes(friendship1.user);
};

//check whether user have pending request from a given user id
const hasPendingRequest = (friendship, user_id) => {
    console.log("UID", user_id)
    console.log(friendship.friend_requests)
    return friendship.friend_requests.includes(user_id);
};

module.exports = {
    initFriendRequest,
    friendRequestExists,
    hasPendingRequest,
    removeFriendRequest,
    addFriend
}
