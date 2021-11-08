const express = require("express");
const app = express();

const skillManager = require("./skillManager.js");

let locale;

app.set('views', `${__dirname}\\www\\views`);
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.render('index', { data : {skills: skillManager.getInstalledSkills(locale)}})
});

function startUI(loc = "de_DE", port = 3000){
    locale = loc;
    app.use(express.static(`${__dirname}\\www\\public`));

    app.listen(port, () => {
        console.log(`Server listening on: http://localhost:${port}`);
    })
}

module.exports = {
    startUI
}