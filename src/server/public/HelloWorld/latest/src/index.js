const customSdk = require("@fwehn/custom_sdk");

function helloWorld(hello, world){
    console.log(hello + world)
}

function hello(hello){
    console.log(hello)
}

module.exports = {
    helloWorld, hello
}