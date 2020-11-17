const express = require("express");
//const bodyParser = require('body-parser');

const app = express();
const expressjwt = require('express-jwt');

var cookieParser = require('cookie-parser')


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*
app.use("/gymuser", (req, res, next)=>{
    console.log("gym user", "middleware");
    //res.status(401).send("Invalid token");
    next();
});*/

app.use(["/login", "/gymuser"], expressjwt({ secret: 'secret1', algorithms: ['HS256'] }) )
//app.use("/gymuser", expressjwt({ secret: 'secret1', algorithms: ['HS256'] }) )


app.get("/", (req, res) => {
    res.send(200).send("100: AOK!");
});

require("./gymuser")(app);

require("./auth")(app);

module.exports = app;
