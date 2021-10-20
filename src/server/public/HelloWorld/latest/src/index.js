const customSdk = require("@fwehn/custom_sdk");

function helloWorld(hello, world){
    console.log(`${hello} ${world}`);
    customSdk.say(`${hello} ${world}`);
}

function hello(hello){
    console.log(hello);
    customSdk.say(hello);
}

module.exports = {
    helloWorld, hello
}