const jwt = require('jsonwebtoken');

const create_jwt_token = (payload) => {
    return jwt.sign(payload,
		    "secret1",
		    {
			algorithm: "HS256",
			expiresIn: 60* 60 * 2 //60 * 20
			
		    });
}

const create_jwt_refresh_token = (payload) => {
    return jwt.sign(payload,
		    "secret1", {
			algorithm: "HS256",
			expiresIn: "2h"
		    })
}


module.exports = {
    create_jwt_token,
    create_jwt_refresh_token
}
