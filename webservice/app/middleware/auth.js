const User = require("../../models/user").User;
;
const authUser = async (req, res, next) => {
    const currentUser = await User.find({_id: req.user.user._id});
    //res.status(401).send('invalid token...');
    req.locals = {
	currentUser: currentUser
    };

    /*
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err.message});
      logger.error(err);
      return;
    }*/
    
    console.log("Auth middleware");
    next();
}

const handleError = function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
	res.status(err.status).send({message:err.message});
	logger.error(err);
	return;
    }
    next();
};



module.exports = {
    authUser,
    handleError
};
