const customSdk = require("@fwehn/custom_sdk"), fs = require("fs"), mqtt = require('mqtt')
path= require("path")
const stateMap = ["OFF", "ON", "TOGGLE"]
const scenePath = path.join(`${__dirname}`, "../savefiles/listScenes.json")


function getZigbeeTopic() {
    return new Promise((resolve, reject) => customSdk.getVariable("Zigbee2MQTT-Topic").then(resolve).catch(reject))
}

function init() {
    fs.readFile(scenePath, (err, data) => {
        if (err) {
            fs.writeFile(scenePath, JSON.stringify({ scenes: [] }),err => { if(err) customSdk.fail(err)})
            return
        }
        let postSlots = customSdk.getSlotHandler()
        //console.log(JSON.parse(data).scenes.map((value)=>{revalue.name}))
        postSlots("zigbee_scenes", JSON.parse(data).map((value) => { return value.name }), true)

    })

}

function changeLightState(zigbeeName, state) {
    getZigbeeTopic()
        .then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "state": stateMap[state] })
        }).catch(customSdk.fail);
}

function setLightBrightness(zigbeeName, brightness) {
    getZigbeeTopic()
        .then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "brightness": Math.floor(255 * brightness / 100) })
        }).catch(customSdk.fail);
}

function moveLightBrightness(zigbeeName, change) {
    getZigbeeTopic()
        .then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            if (change)
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "brightness_step": 20 })
            else
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "brightness_step": -20 })
        }).catch(customSdk.fail);
}

function moveColorTemperature(zigbeeName, change) {
    getZigbeeTopic()
        .then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            if (change == 0)
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp_step": -20 })
            else if ( change == 1)
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp_step": 20 })
            else
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp": 370 })
                
        }).catch(customSdk.fail);
}

function setColorTemperature(zigbeeName, temperature) {
    getZigbeeTopic()
        .then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            if (temperature == 0 )
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp": 153 })
            else if ( temperature == 1)
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp": 555 })
            else
                customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color_temp": 370 })
        }).catch(customSdk.fail);
}

function changeLightColor(zigbeeName, colorhex) {
    getZigbeeTopic().then(zigbeeTopic => {
            customSdk.say(customSdk.generateAnswer([]));
            customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "color": { "hex": colorhex } })
    }).catch(customSdk.fail);
}

function addToGroup(groupName, zigbeeName) {
    getZigbeeTopic().then(zigbeeTopic => {
        customSdk.publishMQTT(`${zigbeeTopic}/bridge/request/group/members/add`, { "group": groupName, "device": zigbeeName })
    })
}

function removeFromGroup(groupName, zigbeeName) {
    getZigbeeTopic().then(zigbeeTopic => {
        customSdk.publishMQTT(`${zigbeeTopic}/bridge/request/group/members/remove`, { "group": groupName, "device": zigbeeName })
    })
}

function getState(zigbeeName, property) {
    getZigbeeTopic().then(zigbeeTopic => {
        let client = mqtt.connect(customSdk.getMQTT())
        client.on("connect", () => {
            client.subscribe(`${zigbeeTopic}/${zigbeeName}`)
            client.on("message", (_, message) => {
                let formatted = JSON.parse(message)
                client.end()
                switch (property) {
                    case 0: {
                        if (formatted.state)
                            customSdk.say(customSdk.generateAnswer([zigbeeName, formatted.state]))
                        else customSdk.fail(`Device ${zigbeeName}has no such Property`, customSdk.generateFailResponse([zigbeeName]))
                        break
                    }
                    case 1: {
                        if (formatted.brightness)
                        customSdk.say(customSdk.generateAnswer([zigbeeName, (formatted.brightness / 255) * 100 + "%"]))
                        else customSdk.fail(`Device ${zigbeeName}has no such Property`, customSdk.generateFailResponse([zigbeeName]))
                        break
                    }

                }

            })
            customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/get`, { state: "" })
        })
    })
}

function createScene(zigbeeName, sceneName) {
    getZigbeeTopic().then(zigbeeTopic => {
        fs.readFile(scenePath, (err, data) => {
            if (err) {
                customSdk.fail(err)
                return
            }
            if (data == "")
                data = { scenes: [] }
            let saved= JSON.parse(data)
            if (!sceneName) {
                sceneName = zigbeeName +" "+ (saved.length+1)
            }
            let newScene= {
                zigbeeName: zigbeeName,
                "id": (saved.length+1),
                "name": sceneName.toLowerCase()
            }

            saved.push(newScene)
            customSdk.publishMQTT(`${zigbeeTopic}/${zigbeeName}/set`, { "scene_store": { "ID": newScene.id, "name": newScene.name }})
            customSdk.say(customSdk.generateAnswer([sceneName]))
            //let postSlots = customSdk.getSlotHandler()
            customSdk.getSlotHandler()("zigbee_scenes", sceneName)
            fs.writeFile(scenePath, JSON.stringify(saved), err => { if(err) customSdk.fail(err, customSdk.generateFailResponse())})
        })


    })
}


function recallScene(sceneName) {
    getZigbeeTopic().then(zigbeeTopic => {
        fs.readFile(scenePath, (err, data) => {
            if (data == "")
                customSdk.fail("No scenes saved",customSdk.generateFailResponse([sceneName]))
            else {
                let saved = JSON.parse(data)
                let scene = saved.find(elem => (elem.name == sceneName))
                if (scene) {
                    customSdk.publishMQTT(`${zigbeeTopic}/${scene.zigbeeName}/set`, { "scene_recall": scene.id })
                } else
                    customSdk.fail("No such element",customSdk.generateFailResponse([sceneName]))

            }
        })

    })
}

function getGroups() {
    customSdk.say(customSdk.generateAnswer([customSdk.getZigbeeGroups()]))
}

init()

module.exports = {
    changeLightState,
    setLightBrightness,
    moveLightBrightness,
    changeLightColor,
    moveColorTemperature,
    setColorTemperature,
    createScene,
    recallScene,
    addToGroup,
    removeFromGroup,
    getGroups,
    getState
}