const customSdk = require("@fwehn/custom_sdk");
const axios = require('axios');

function getUrl() {
    return new Promise((resolve, reject) => {
        customSdk.getAllVariables()
            .then(variables => {
                resolve(`https://api.openweathermap.org/data/2.5/forecast?zip=${variables["city"]},${variables["country"]}&appid=${variables["APIKey"]}&lang=${variables["language"]}&units=${variables["units"]}`);
            }).catch(error=>{
                customSdk.fail(error, customSdk.generateFailResponse([]))
            })
    });
}

function getCurrentWeather() {

    //added weather warnings
    getWarning().then(notifyWarning)

    getUrl()
        .then(axios.get)
        .then(res => {
            let data = res.data.list[0];
            let answer = customSdk.generateAnswer([res.data.city.name, data.weather[0].description, Math.floor(data.main.temp), Math.floor(data.main.feels_like)]);
            customSdk.say(answer)
        }).catch(error=>{
            customSdk.fail(error, customSdk.generateFailResponse([]))
        })
}

function getForecast(day = 1) {
    getSortedData().then(data => {
        let date = new Date();
        date.setDate(date.getDate() + day);

        let forecastDay = data[date.toISOString().split("T")[0]];
        let answer = customSdk.generateAnswer([forecastDay["avg_desc"], Math.floor(forecastDay["temp_min"].toString()), Math.floor(forecastDay["temp_max"].toString())]);
        customSdk.say(answer)
    }).catch(error=>{
        customSdk.fail(error, customSdk.generateFailResponse([]))
    })
}

function getSortedData() {
    return new Promise((resolve, reject) => {
        getUrl()
            .then(axios.get)
            .then(res => {
                let days = {}
                let list = res.data.list;

                for (let i in list) {
                    let date = list[i]["dt_txt"].split(" ")[0];

                    if (!days.hasOwnProperty(date)) {
                        days[date] = {
                            "temp": [],
                            "desc": []
                        };
                    }

                    days[date]["temp"].push(list[i].main.temp);
                    days[date]["temp_min"] = Math.min(...days[date]["temp"])
                    days[date]["temp_max"] = Math.max(...days[date]["temp"])
                    days[date]["desc"].push(list[i].weather[0].description);
                    days[date]["avg_desc"] = getMostFrequentValue(days[date]["desc"])
                }

                resolve(days);
            }).catch(error=>{
                customSdk.fail(error, customSdk.generateFailResponse([]))
            })
    });
}

function getMostFrequentValue(array) {
    let frequencyMap = array.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {})
    return Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
}

//function to get chance of precipitation for the next x hours
function getPrecipitation(hours) {
    let now = new Date().getHours()
    let maxPop = 0
    getAllDataForOneDay(0).then(res => {
        res.forEach(it => {
            let forecastTime = parseInt(it["dt_txt"].split(" ")[1].split(":")[0])
            if ((forecastTime > now) && (forecastTime <= now + hours))
                if (it.pop > maxPop)
                    maxPop = it.pop
        })
        if (now + hours > 24 && maxPop<1)
            getAllDataForOneDay(1).then(res => {
                res.forEach(it => {
                    let forecastTime = parseInt(it["dt_txt"].split(" ")[1].split(":")[0])
                    if ((forecastTime <= (now + hours) % 24))
                        if (it.pop > maxPop)
                            maxPop = it.pop
                })
            })

        let answer = customSdk.generateAnswer([(maxPop * 100).toString()])
        customSdk.say(answer)
    })


}

//function to receive all data for an entire day
function getAllDataForOneDay(day) {
    return new Promise((resolve, reject) => {
        getUrl()
            .then(axios.get)
            .then(res => {
                let date = new Date(),
                    relevant = []
                date.setDate(date.getDate() + day)                
                res.data.list.forEach(it => {

                    if (it["dt_txt"].split(" ")[0] == (date.toISOString().split("T")[0]))

                        relevant.push(it)

                })

                resolve(relevant)    
            })
    })
}

//function to get notable weather for a x days in the future
//if the day is today (day=0) function will return active weather warnings

function getNotableWeather(day=0) {
    if(day==0){
    getWarning().then(notifyWarning)

    }
    let notable = [], answer
    getAllDataForOneDay(day).then((res) => {
        res.forEach(forecast => {
            if (((forecast.weather[0].id >= 200) && (forecast.weather[0].id < 300)) || ((forecast.weather[0].id >= 500) && (forecast.weather[0].id < 800)))//((200<=forecast.weather[0].id<300)||(500<=forecast.weather[0].id<700))
                if (!notable.includes(forecast.weather[0].description))
                    notable.push(forecast.weather[0].description)
        })
        if(notable.length == 0){
            answer = customSdk.generateAnswer([],index=1)
        }else
            answer = customSdk.generateAnswer([customSdk.generateEnum(notable)])
        
            customSdk.say(answer)
    })
}

//function to get weather warnings for a specific region
function getWarning(){
    return new Promise((resolve, reject) => {
    customSdk.getAllVariables().then(variables =>{ 
        axios.get("https://warnung.bund.de/bbk.dwd/unwetter.json").then(res => {
    
            let rel_warnings=[]
            for(let i in res.data){
                let warning=res.data[i].info[0]
                for( let j in warning.area){
                    let region=warning.area[j]
                    if(region.areaDesc==variables["region"]){
                        rel_warnings.push({name: warning.headline, desc: warning.description})
                    }

                }
            }
            resolve(rel_warnings)

        }).catch(error=>{
            customSdk.fail(error, customSdk.generateFailResponse([]))
        })
    })
})
}

//function to notify about weather warnings
function notifyWarning(warnings){
        if(warnings.length>0){
            let answer = customSdk.generateEnum(warnings.map(elem=> elem.name.toLowerCase()))
            customSdk.say(customSdk.generateAnswer([warnings.length, answer], index=2)) 
            customSdk.publishMQTT("bot", warnings.map(elem=> elem.name+ ": "+ elem.desc) )
        }
}


//function to find out if the temperature drops below a limit in the next x hours
function getMinTemp(hours, limit) {
    let now = new Date().getHours()
    let answer
    let colder = (it) => {
        let forecastTime = parseInt(it["dt_txt"].split(" ")[1].split(":")[0])
        if ((forecastTime <= (now + hours) % 24)) {
            if (it.main.temp_min < limit) {
                answer = customSdk.generateAnswer([hours, limit], index = 0)
                return true
            }
            else return false
        }
    }

    getAllDataForOneDay(0).then(res => {
        res.some(colder)
        if (now + hours > 24)
            getAllDataForOneDay(1).then(res => {
                res.some(colder)
                if (!answer) answer = customSdk.generateAnswer([hours, limit], index = 0)
                customSdk.say(answer)
            })
        else {
            if (!answer) answer = customSdk.generateAnswer([hours, limit], index = 1)
            customSdk.say(answer)
        }
    })

}

module.exports = {
    getCurrentWeather, getForecast, getNotableWeather, getPrecipitation, getMinTemp
}