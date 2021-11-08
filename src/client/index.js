// const rhasspy = require("./rhasspy.js");
const customSdk = require("@fwehn/custom_sdk");
const skillManager = require("./skillManager.js");
const webinterface = require("./webinterface.js");
const cli = require("./cli-tool.js");


skillManager.loadSkills();
customSdk.config({
    mqtt: "192.168.178.121",
    intentHandler: skillManager.customIntentHandler
});
customSdk.init().catch(console.error);
webinterface.startUI(process.env.LOCALE, process.env.PORT);
cli.startCLI();
