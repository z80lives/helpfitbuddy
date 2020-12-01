const validate = require("../utils/validate.js");
const Event = require("../../models/event.js");

const {dateFormat} = require("../utils/date");

module.exports = function eventServices(app){
    //list events for a selected user
    app.post("/gymuser/event/user", async (req, res) => {
	const events = await Event.find({creator: req.body._id});

	res.json({"message": "Success", events, body: req.body})
    });

    app.post("/gymuser/event/join", async (req, res) => {
	const _id = req.user.user._id;
	const event = await Event.findOne({_id: req.body._id});
	
	if(event.participants.includes(_id)){
	    res.status(500).json({"message":"User already in event"});
	    return;
	}else{
	    event.participants.push(_id);
	    await event.save();
	}
	
	res.json({"message": "Successfully joined!" + _id, event});
    });

    app.delete("/gymuser/event", async (req, res) => {
	const _id = req.body._id;
	/*await Event.remove({}, function(err) { 
	    console.log('collection removed') 
	});	*/
	res.json({"message": "Deleting event "+_id});
    });
    
    //lists user events for agenda view
    app.get("/gymuser/event", async (req, res) => {
	const _id = req.user.user._id;
	const createdevents = await Event.find({creator: req.user.user._id}).populate("gym", 'name');
	//await createdevents.populate("gym").execPopulate();
	const participatingEvents = await Event.find({participants: req.user.user._id}).populate("gym", "name");
	
	//await participatingEvents.populate("gym").execPopulate();
	const myEvents = [...createdevents, ...participatingEvents];
	
	const eventMap = {};
	myEvents.forEach( async event => {
	    var dateStr = dateFormat(new Date(event.date));

	    event.date = dateStr;
	    const selfCreated = event.creator == req.user.user._id;
	    if(!eventMap[event.date])
		eventMap[event.date] = [];
	    eventMap[event.date].push({...event.toJSON(), selfCreated});
	});

	const filtered = participatingEvents.map(e => {
	    return {
		p: e.participants.includes(_id)
	    };
	});
	res.json({
	    "message": "Event list",
	    events: eventMap
	});
    });

    app.post("/gymuser/event", (req, res) => {
	const expected_keys = ["name", "date", "time", "gym", "type", "invite"];

	if (!validate.handleValidateResponse(req, res, expected_keys) )
	    return false;

	const newEvent = new Event({...req.body, creator: req.user.user._id});

	newEvent.save( (err) => {
	    if(!err){
		res.json({
		    "message": "Event successfully created"
		});
	    }else{
		res.status(500).json({
		    "message": "Failed to create event"
		});
	    }
	});
    });

    app.get("/events", async (req, res) =>{
	const events = await Event.find({});

	res.json(events);
    });
   

    app.delete("/events", async (req, res) => {
	await Event.remove({}, function(err) { 
	    console.log('collection removed') 
	});	
	res.json({"message": "Event data cleared"});
    });



}
	    

