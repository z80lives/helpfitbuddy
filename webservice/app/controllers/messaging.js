const validate = require("../utils/validate.js");
const User = require("../../models/user").User;
const Messages = require("../../models/messages");

const MessageThread = require("../../models/message_thread");
const MessageInbox = require("../../models/message_inbox");
//const gps = require("./utils/gps.js");

const fetchMsgThread = async (users) => {
    const foundThread = await MessageThread.findOne({
	"participants": {
	    $all: [
		...users
	    ]
	}
    });
    if(!foundThread){	
	return await new MessageThread({
	    messages: [],
	    participants: [...users],
	    type: "private"
	}).save();
    }else{
	return foundThread;
    }
};

const fetchUserInbox = async (user_id) => {
    const inbox = await MessageInbox.findOne({user: user_id});
    if(inbox == null){
	return await new MessageInbox({
	    user: user_id
	}).save();
    }else{
	return inbox;
    }
};


//prepares the inboxes of the thread
const initInboxes = async (thread) => {
    return [(await fetchUserInbox(thread.participants[0]))._id,
	    (await fetchUserInbox(thread.participants[1]))._id
	   ];
};



module.exports =  function messageingServices(app){
    //admin view messages
    app.get("/admin/messages/threads", async(req, res) => {
	const data = await MessageThread.find({});
	res.json({data});
    });

    
    app.delete("/admin/messages", async (req, res) => {
	await MessageInbox.remove({}, function(err) { 
	    console.log('collection removed') 
	});

	await MessageThread.remove({}, function(err) { 
	    console.log('collection removed') 
	});

	await Messages.remove({}, function(err) { 
	    console.log('collection removed') 
	});


	
	res.json({"message": "messaging data cleared"});
    });

    
    //retrieve messages
    app.get("/gymuser/messages", async (req, res) => {
	res.json({"message": "retrieve messages"});
    });

    //create private message thread
    app.post("/gymuser/message/private/thread", async (req, res) => {
	//validation
	const expected_keys = ["recipient"];	
	if (!validate.handleValidateResponse(req, res, expected_keys) )
	    return false;
	if(req.body.recipient == req.user.user_id){
	    res.status(500).json({"message": "Cannot send message to self"});
	    return false;
	}

	
	const msgThread = await fetchMsgThread([req.body.recipient, req.user.user._id]);
	const inboxes = await initInboxes(msgThread);
	//const 
	
	res.json({
	    "message": "Private thread created",
	    msgThread,
	    inboxes
	});
    });


     //view message thread
    app.get("/gymuser/message/private/thread", async (req, res) => {
	//validation
	const expected_keys = ["recipient"];	
	if (!validate.handleValidateResponse(req, res, expected_keys) )
	    return false;
	
	if(req.body.recipient == req.user.user_id){
	    res.status(500).json({"message": "Cannot send message to self"});
	    return false;
	}

	
	const msgThread = await fetchMsgThread([req.body.recipient, req.user.user._id]);
	const inboxes = await initInboxes(msgThread);
	//const inbox = await fetchUserInbox(req.user.user._id);
	
	
	res.json({
	    "message": "Message thread recieve",
	    inboxes,
	    thread: await msgThread.populate("messages").execPopulate()
	});
    });

    //send message
    app.post("/gymuser/message/private", async (req, res) => {
	const expected_keys = ["recipient", "message"];	
	if (!validate.handleValidateResponse(req, res, expected_keys) )
	    return false;

	const message_thread = await fetchMsgThread([req.body.recipient, req.user.user._id]);
	//const messgae_inbox = await fetchMsgInbox(req.)
	const inboxes = await initInboxes(message_thread);

	const msg = await new Messages({
	    sender: req.user.user._id,
	    ...req.body
	}).save();

	message_thread.messages.push(msg._id);

	await message_thread.save();
	
	res.json({
	    "message": "send message",
	    msg,
	    message_thread,
	    inboxes
	});
    });

}
