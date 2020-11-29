const validate = require("../utils/validate.js");
const Event = require("../../models/event.js");

module.exports = function eventServices(app){
    //lists user events
    app.get("/gymuser/event", async (req, res) => {
	const createdevents = await Event.find({creator: req.user.user._id});
	const participatingEvents = await Event.find({participants: req.user._id});
	const myEvents = [...createdevents, ...participatingEvents];
	
	const eventMap = {};
	myEvents.forEach( event => {
	    if(!eventMap[event.date])
		eventMap[event.date] = [];
	    eventMap[event.date].push(event);
	});
	
	res.json({
	    "message": "Event list",
	    "events": [
		{
		    '2020-11-16': [
			{name: 'item 1 - any js object', "time": "09:00"},
			
		    ]
		}
	    ],
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
	    

