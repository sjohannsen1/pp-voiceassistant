const customSdk = require("@fwehn/custom_sdk");

export function helloWorld(hello, world){
    customSdk.say(`${hello} ${world}`);
}