const networking = require("./rhasspy.js");

networking.postSlots("Test", ["Slot"], true).then(res => {
    console.log(res.data);
    networking.trainRhasspy().then(res => console.log(res.data));
}).catch(console.error);