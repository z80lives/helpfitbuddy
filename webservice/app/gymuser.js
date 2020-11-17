module.exports =  function gymUserServices(app){
    app.get("/gymuser/", (req, res) => {
	res.status(200).send("OK");
    });
    
    app.get("/gymuser/neighbors", (req, res) => {
	res.status(200).send("OK");
    });
}

