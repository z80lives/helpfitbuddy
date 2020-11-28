const express = require("express");
//const bodyParser = require('body-parser');

const app = express();
const expressjwt = require('express-jwt');

var cookieParser = require('cookie-parser')

const mongoose = require('mongoose');

const connectDb =  () => {
  return mongoose.connect("mongodb://localhost/stayfitdb");
};

const authMiddleware = require("./middleware/auth");

connectDb();

//app.use(express.bodyParser({limit: '50mb'})); 

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*
app.use("/gymuser", (req, res, next)=>{
    console.log("gym user", "middleware");
    //res.status(401).send("Invalid token");
oo    next();
});*/

app.use(["/login", "/gymuser", "/gym"],
	expressjwt({ secret: 'secret1', algorithms: ['HS256'] }));

app.use(authMiddleware.handleError);
//app.use(["/gymuser", "/gym"], authMiddleware);
	
//app.use("/gymuser", expressjwt({ secret: 'secret1', algorithms: ['HS256'] }) )

app.get("/", (req, res) => {
    res.status(200).send("100: AOK!");
});

require("./gymuser")(app);
require("./controllers/gym")(app);
require("./auth")(app);

module.exports = app;
