const customSdk = require("@fwehn/custom_sdk");

function helloWorld(hello, world){
    customSdk.say(`${hello} ${world} V3`);
}

function hello(hello){
    customSdk.say(hello);
}

module.exports = {
    helloWorld, hello
}