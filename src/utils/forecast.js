const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a57982134553cd4d20059971a9e7ab15&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to network", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `In ${body.location.name}, The temperature is ${body.current.temperature} and it feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
