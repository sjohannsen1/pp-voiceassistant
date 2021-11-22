const rhasspy = require("./rhasspy.js");
const customSdk = require("@fwehn/custom_sdk");
const skillManager = require("./skillManager.js");
const webinterface = require("./webinterface.js");
const cli = require("./cli-tool.js");
const fs = require("fs");
let defaults = JSON.parse(fs.readFileSync(`./defaults.json`).toString())[process.env.LOCALE];


skillManager.loadSkills();
customSdk.config({
    mqtt: "192.168.178.121",
    intentHandler: skillManager.customIntentHandler
});
customSdk.init().catch(console.error);
rhasspy.postSlots("launch", defaults["launch"], true).then(() => rhasspy.trainRhasspy()).catch(console.error);
webinterface.startUI(process.env.LOCALE, process.env.PORT);
cli.startCLI();

