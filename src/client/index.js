const rhasspy = require("./rhasspy.js");
const customSdk = require("@fwehn/custom_sdk");
const skillManager = require("./skillManager.js");
const webinterface = require("./webinterface.js");
const cli = require("./cli-tool.js");
const fs = require("fs");
const defaults = JSON.parse(fs.readFileSync(`./defaults.json`).toString())[process.env.LOCALE || "de_DE"];


skillManager.loadSkills();
customSdk.config({
    mqtt: process.env.MQTTHOST || "localhost",
    port: process.env.MQTTPORT || "1883",
    intentHandler: skillManager.customIntentHandler
});
customSdk.init().catch(console.error);
rhasspy.postSlots("launch", defaults["launch"], true).then(() => rhasspy.trainRhasspy()).catch(console.error);

//TODO add env-variable to switch ui and cli on and off

webinterface.startUI(process.env.LOCALE || "de_DE", process.env.PORT || "12102");
// cli.startCLI();

