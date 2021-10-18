const unzipper = require("unzipper");
const http = require("http");
const fs = require("fs");

function downloadSkill(name = "HelloWorld"){
    http.get(`http://${process.env.SERVER}/download/${name}`, function (res) {
        res.pipe(unzipper.Extract({ path: `${__dirname}\\skills\\${name}` }))
    })
}

function getInstalledSkills(locale = "de_DE"){
    let path = `${__dirname}\\skills\\`;
    let skills = [];

    fs.readdirSync(path).forEach(skill => {
        fs.readdirSync(path + skill.toString() + "\\latest\\locales").forEach(file => {
            if (file.startsWith(locale)){
                skills.push(skill);
            }
        })
    });

    return skills;
}

//TODO get available updates based on locales/{name}.json

module.exports = {
    downloadSkill, getInstalledSkills
}