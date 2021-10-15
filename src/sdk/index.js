let configObject = {
    mqtt: 'localhost:1883'
}

function config(options = {}){
    for (let i in options){
        if (!configObject.hasOwnProperty(i) || options[i] === undefined || options[i] === null) continue;

        configObject[i] = options[i];
    }
}

function say(text = ""){
    console.log(configObject)
    console.log(text);
}

module.exports = {
    config, say
}