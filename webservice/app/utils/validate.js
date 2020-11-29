const isNullString = (data) => {
    if(typeof data == "string"){
	return data.length == 0;
    }
    return false;
};

const notNull = el => el != null;

const getEmptyStringKeys = dict => {
    const key_list = Object.keys(dict);
    return key_list.map(key => {
	if(isNullString(dict[key])){
	    return `'${key}' cannot be empty`;
	}
    }).filter(notNull);
};

const getNullKeys = (expected_keys, received_data) => {
    return expected_keys.map( (key) => {
	return !(key in received_data)?`${key} not received from client`:null;
    }).filter(notNull);
}

const handleValidateResponse = (req, res, expected_keys) => {
    const data = req.body;
    const empty_errors = getEmptyStringKeys(data);
    const null_errors = getNullKeys(expected_keys, data);
    const validate_errors = [...empty_errors, ...null_errors];

    if (validate_errors.length > 0){
	res.status(500).json({
	    //message: "Validation error occured: "+validate_errors[0],
	    message: validate_errors[0],
	    error_messages: validate_errors
	});
	return false;
    }
    return true;
}

module.exports = {
    getNullKeys,
    getEmptyStringKeys,
    handleValidateResponse
}
