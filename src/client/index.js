// const rhasspy = require("./rhasspy.js");
const customSdk = require("@fwehn/custom_sdk");
const skillManager = require("./skillManager.js");
const skills = skillManager.loadSkills();
const cli = require("./cli-tool.js");

customSdk.config({
    mqtt: "192.168.178.121",
    intentHandler: customIntentHandler
});

customSdk.init().catch(console.error);
cli.startCLI();

// Registering Skill Sentences/Slots and connecting to the MQTT-Broker
// rhasspy.registerSkills(process.env.LOCALE).then(() => {
//
// }).catch(console.error);

// Custom Intent Handler to call functions based on Intent and Slots
function customIntentHandler(topic, message){
    let slots = {};
    let formatted = JSON.parse(message.toString())
    for (let i in formatted.slots){
        let currentSlot = formatted.slots[i];

        if (currentSlot.slotName !== "launch"){
            //TODO make launch slot accessible to skills
            slots[currentSlot.slotName] = currentSlot.value.value;
        }
    }

    let fun = skillManager.getFunctionMatchingSlots(formatted.intent.intentName, slots, process.env.LOCALE)

    if (fun.hasOwnProperty("name") && fun.hasOwnProperty("params") && fun.hasOwnProperty("answer")){
        customSdk.setAnswer(fun["answer"]);
        skills[formatted.intent.intentName][fun["name"]].apply(this, fun["params"]);
    }

}
