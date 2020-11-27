const User = require("../../models/user").User;
;
const authUser = async (req, res, next) => {
    const currentUser = await User.find({_id: req.user.user._id});
    //res.status(401).send('invalid token...');
    req.locals = {
	currentUser: currentUser
    };
    //console.log("Auth middleware");
    next();
}

module.exports = authUser;
