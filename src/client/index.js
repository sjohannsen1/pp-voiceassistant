const rhasspy = require("./rhasspy.js");
const skillManager = require("./skillManager.js");
const customSdk = require("@fwehn/custom_sdk");

customSdk.config({
    mqtt: process.env.MQTT
});


customSdk.say("something")

// skillManager.downloadSkill();