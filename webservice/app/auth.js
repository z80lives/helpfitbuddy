//const jwt = require("json-web-token");
const expressjwt = require('express-jwt');
const tokenmanager = require("./utils/token_manager.js");


function authServices(app) {

    //GENERAL USER LOGIN CALL
    app.post("/user/login", (req, res) => {
	//res.send(200).send("Login in as user");
	const data = req.body;

	const verifyUser = data.username == "user1";
	const verifyPassword = data.password == "1234"	

	if(verifyUser && verifyPassword){
	    const payload = {
		user: {
		    name: data.username,
		    type: "gymuser"
		}
	    };
	    let access_token  = tokenmanager.create_jwt_token(
		payload
	    );
	    //send token to the cookie
	    res.cookie("jwt", access_token, {secure: true, httpOnly: true})
	    res.json({
		"message": "Successfully signed in",
		"token" : access_token
	    });    
	}else{
	    //Create an appropriate sign in message (for debugging purpose): remove this before release
	    const message = "Cannot sign in: "+
		  (verifyUser? "" : "Incorrect user ")+
		  ((!verifyUser&&!verifyPassword)?"and ":"")+
		  (verifyPassword? "" : "Incorrect password");
	    
	    //const message = "Incorrect username or password";
	    res.json({"message": message});
	}
	
    });

    //parse token and returns the login state of the user
    app.get("/login/state",  (req, res) => {
	//if (!req.user.user.type != "gymuser")
	//    return res.sendStatus(401);
	if(req.user){
	    return res.status(200).
		json({
		    "message": "User is logged in",
		    ...req.user.user
		});
	};
	res.status(403).json({"message": "User not logged in"});
    });

    
    //Refresh login state
    app.get("/login/refresh",  (req, res) => {
	
	if(req.user){
	    const data = req.user.user;
	    const newToken = tokenmanager.create_jwt_refresh_token({
		user: {
		    name: data.username
		}
	    });
	    
	    return res.status(200).
		json({
		    "message": "Token refreshed",
		    "token": newToken
		});
	};
	res.status(403).json({"message": "Unauthorized API Call"});
    });

    

    //GYM USER CREATE CALL
    app.post("/user/register", (req, res) => {
	res.json({"message": "Logging in"});
    });
}

module.exports = authServices;
