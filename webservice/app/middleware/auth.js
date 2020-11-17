const authUser = (err, req,res, next) => {
    res.status(401).send('invalid token...');
    //next();
}

module.exports = authUser;
