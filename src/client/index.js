const fs = require("fs");

const rhasspy = require("./rhasspy.js");
const skillManager = require("./skillManager.js");
const customSdk = require("@fwehn/custom_sdk");

rhasspy.registerSkills();