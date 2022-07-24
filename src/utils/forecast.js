const request = require("postman-request");

const forecast = (lat, lon, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=edb693174da8447d30a2d7fe8b683621&query=" +
        lat +
        "," +
        lon +
        "&units=m";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(
                undefined,
                "In " +
                    body.location.name +
                    "," +
                    body.location.country +
                    " (LAT: " +
                    body.location.lat +
                    " - LON: " +
                    body.location.lon +
                    ") the weather is " +
                    body.current.weather_descriptions[0] +
                    " and the temperature is " +
                    body.current.temperature +
                    " Celsius. However, feels like " +
                    body.current.feelslike +
                    " Celsius. The current local time is " +
                    body.location.localtime +
                    ". The air pressure is " +
                    body.current.pressure +
                    "MB and the humidity is " +
                    body.current.humidity +
                    "%. The wind speed is " +
                    body.current.wind_speed +
                    " KPH in the " +
                    body.current.wind_dir +
                    " direction."
            );
        }
    });
};

module.exports = forecast;
