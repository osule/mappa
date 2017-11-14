const geolib = require('geolib');

const BOUNDS = {
    latitude: 52.53,
    longitude: 13.403,
    radius: 3500,
};

/*
  Checks location lies within boundary circle.
*/
function liesWithinBoundaryCircle(latitude, longitude) {
    return geolib.isPointInCircle(
        { latitude, longitude },  
        { latitude: BOUNDS.latitude, longitude: BOUNDS.longitude }, 
        BOUNDS.radius
    );
}

module.exports = {
    liesWithinBoundaryCircle,
}