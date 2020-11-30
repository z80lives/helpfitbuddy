const {dateFormat, getAge} = require("./date.js");
const {distanceInKmBetweenEarthCoordinates} = require("./gps.js");
var GeoPoint = require('geopoint');

const getDistance = (currentLocation, otherLocation) => {
    const long1  = currentLocation.coords.longitude;
    const lat1 = currentLocation.coords.latitude;
    const long2 = otherLocation.coords.longitude;
    const lat2 = otherLocation.coords.latitude;    


    point1 = new GeoPoint(lat1, long1);
    point2 = new GeoPoint(lat2, long2);
    return Math.round(point1.distanceTo(point2, true)  * 100) / 100;

    //return {lat1, lat2, long1, long2}
    //return distanceInKmBetweenEarthCoordinates(lat1, long1, lat2, long2)
};

const processUser = user => {	   
    const location = user.location.length!=0?JSON.parse(user.location[0]):user.location;
    const dob = user.dob? dateFormat(new Date(user.dob)):user.dob;
    const age = getAge(new Date(user.dob)).toString();
    return {
	...user.toJSON(),
	location,
	age,
	dob
    };
};

module.exports = {
    processUser,
    getDistance
};
