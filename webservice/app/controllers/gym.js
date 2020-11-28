const Gym = require("../../models/gym");

module.exports = function gymServices(app){
    //get current gym info
    app.post("/gym", (req, res) => {
	const data = req.body;

	const newGym = new Gym({
	    ...data
	});

	newGym.save( (err) => {
	    res.json({"message": "AOK"})
	});
    });
    

    app.get("/gym", (req, res) => {
	res.json({"message": "AOK"})
    });
}
	   
