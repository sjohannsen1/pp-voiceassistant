const rhasspy = require("./rhasspy.js");
const skillManager = require("./skillManager.js");

// rhasspy.postSlots("Test", ["Slot"], true).then(res => {
//     console.log(res.data);
//     rhasspy.trainRhasspy().then(res => console.log(res.data));
// }).catch(console.error);

skillManager.downloadSkill();