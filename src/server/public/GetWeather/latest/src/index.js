const customSdk = require("@fwehn/custom_sdk");
const weather = require('weather-js');
let city = "51789"; // TODO get real city and degree type
let degreeType = "C";

async function getCurrentWeather(){
    getInformation(city, degreeType).then(data => {
        let currentTemperature = data["current"]["temperature"]
        let answer = customSdk.generateAnswer([currentTemperature]);
        console.log(answer);
        customSdk.say(answer);
    }).catch(() => customSdk.fail());
}

function getForecast( days = 1){
    getInformation(city, degreeType).then(data => {
        console.log(days);
        console.log(data["forecast"]);
    }).catch(() => customSdk.fail());
}

async function getInformation(city, degreeType){
    return new Promise((resolve, reject) => {
        weather.find({search: city, degreeType: degreeType}, (err, result) => {
            if (err) reject(err);

            resolve(result[0]);
        });
    });
}

module.exports = {
    getCurrentWeather, getForecast
}