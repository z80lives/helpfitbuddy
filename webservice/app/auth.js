//const jwt = require("json-web-token");
const expressjwt = require('express-jwt');
const tokenmanager = require("./utils/token_manager.js");

const UserModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

function authServices(app) {

    //GENERAL USER LOGIN CALL
    app.post("/user/login", async (req, res) => {
	//res.send(200).send("Login in as user");
	const data = req.body;

	const user = await UserModel.User.findOne({username: data.username});
	console.log("data", data);
	console.log("User", user);
	
	const verifyUser = user != null;
	const verifyPassword = user && 	bcrypt.compareSync(data.password, user.hash);
	const userData = user.toJSON();
	delete userData["hash"];
	delete userData["image"];
	if(verifyUser && verifyPassword){
	    const payload = {
		user: {		    
		    ...userData
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
	    const message = "Incorrect username or password";
	    res.status(401).json({"message": message});
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
		    user: req.user.user
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

    //retrieve profile picture given id (GLOBAL)
    app.post("/picture", async (req, res) => {
	const _id = req.body._id;
	const user = await UserModel.User.findOne({"_id": _id});

	res.status(200).json({"message": "OK", image: user.image})
						  
    });
    

    //GYM USER CREATE CALL
    app.post("/user/register", (req, res) => {
	const data = req.body;
	const hash = bcrypt.hashSync(data.password);
	const newUser = UserModel.User({...data, hash});	

	newUser.save( (err) => {
	    if(!err)
		res.json({"message": "Signup success!"});
	    else
		res.json({"message": "Failed to signup"})
	});
    });

    app.get("/users", async (req, res) => {
	const data = await UserModel.User.find().select('-image');;
	res.json({"message": "Listing users", data})
    });


    app.delete("/users", async (req, res) => {
	await UserModel.User.remove({}, function(err) { 
	    console.log('collection removed') 
	});	
	res.json({"message": "User data deleted"});
    });
}

module.exports = authServices;
