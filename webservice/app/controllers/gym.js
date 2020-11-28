const Gym = require("../../models/gym");

module.exports = function gymServices(app){
    //get current gym info
    app.post("/gym", (req, res) => {
	console.log(Gym)
	res.json({"message": "AOK"})
    });

    app.get("/gym", (req, res) => {
	res.json({"message": "AOK"})
    });
}
	   
