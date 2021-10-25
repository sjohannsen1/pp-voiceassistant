const app = require("express")();
const zip = require("express-easy-zip");
const fs = require("fs");

const port = process.env.PORT;
app.use(zip());

// Returns a list of available Skills with their last version tag
app.get('/skills', (req, res) => {
    let dirs = fs.readdirSync(`${__dirname}\\public\\`);
    let body = {}
    for (let i in dirs){
        if (dirs[i].startsWith("_")) continue;
        body[dirs[i]] = JSON.parse(fs.readFileSync(`${__dirname}\\public\\${dirs[i]}\\latest\\manifest.json`).toString()).version;
    }
    res.json(body);
});

// Returns details about skill version
app.get('/skill/:skillName/:versionTag', (req, res) => {
    if (req.params.skillName.startsWith("_") || !fs.readdirSync(`${__dirname}\\public`).includes(req.params.skillName) || !fs.readdirSync(`${__dirname}\\public\\${req.params.skillName}`).includes(req.params.versionTag)){
        res.json({"error": "Skill/Version not found!"});
        return;
    }

    let details = {};
    let skillManifest = JSON.parse(fs.readFileSync(`${__dirname}\\public\\${req.params.skillName}\\${req.params.versionTag}\\manifest.json`).toString());

    details["version"] = skillManifest.version;
    details["locales"] = fs.readdirSync(`${__dirname}\\public\\${req.params.skillName}\\${req.params.versionTag}\\locales`).map(locale => locale.split(".")[0]);
    details["dependencies"] = skillManifest.dependencies;
    res.json(details);
});

// Zips up requested skill and returns it
app.get('/download/:skillName', async (req, res) => {
    let tag = "latest";
    let dirPath = `${__dirname}\\public\\${req.params.skillName}\\${tag}`;
    await res.zip({
        files: [{
            path: dirPath,
            name: tag
        }],filename: `${req.params.skillName}.zip`});
});

app.listen(port,() => {
    console.log("Server listen on Port " + port);
});