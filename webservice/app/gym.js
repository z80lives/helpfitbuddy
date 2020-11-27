const gymServices(app){

    //get current gym info
    app.get("/gym", (req, res) => {
	res.json({"message": "AOK"});
    }
}
