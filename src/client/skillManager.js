const unzipper = require("unzipper");
const http = require("http");

function downloadSkill(name = "HelloWorld"){
    http.get(`http://${process.env.SERVER}/download/${name}`, function (res) {
        res.pipe(unzipper.Extract({ path: `${__dirname}\\skills\\${name}` }))
    })
}

//TODO get available updates based on manifest.json

module.exports = {
    downloadSkill
}