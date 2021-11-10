const express = require("express");
const app = express();

const skillManager = require("./skillManager.js");

let locale;

app.set('views', `${__dirname}\\webinterface\\views`);
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.render('index', { data : { skills: skillManager.getSkillsOverview(locale) }});
});

app.get("/details/:skillName", (req, res) => {
    res.render('details', { data : skillManager.getSkillDetails(req.params.skillName, locale)});
});

app.get("/download", async (req, res) => {
    skillManager.getRemoteSkills(locale)
        .then(skills => res.render('download', {data: {skills: skills}}))
        .catch(() => res.render('download', {data: {skills: [{ name: "No connection to Server!", version: "0", installed: true }]}}))
});

app.get("/download/:skillName", (req, res) => {
    //TODO register skills after download

    skillManager.downloadSkill(req.params.skillName).then(() => {
        res.json({
            skill: req.params.skillName,
            success: true,
            message: `Successfully downloaded ${req.params.skillName}`
        });
    }).catch(err => {
        res.json({
            skill: req.params.skillName,
            success: false,
            message: err.toString()
        });
    });

});

// app.get("/delete/:skillName", (req, res) => {
//   
// });

function startUI(loc = "de_DE", port = 3000){
    locale = loc;
    app.use(express.static(`${__dirname}\\webinterface\\public`));

    app.listen(port, () => {
        console.log(`Server listening on: http://localhost:${port}`);
    })
}

module.exports = {
    startUI
}