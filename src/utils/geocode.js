const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
        "http://api.positionstack.com/v1/forward?access_key=0e0e5ae131ae209cee3da104e4575337&query=" +
        encodeURIComponent(address) +
        "&limit=1";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to the location service!", undefined);
        } else if (body.error || body.data.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                location: body.data[0].name,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                country: body.data[0].country,
            });
        }
    });
};

module.exports = geocode;
