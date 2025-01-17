const express = require("express");
const app = express();
const cors = require('cors');
const zip = require("express-easy-zip");
const fileUpload = require("express-fileupload");
const admZip = require('adm-zip');
const bodyParser = require("body-parser");
const fs = require("fs");

const port = process.env.PORT || 3000;

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static("public"));
app.use(zip());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

// Returns a list of available Skills with their last version tag
app.get('/skills/:locale', (req, res) => {
    let dirs = fs.readdirSync(`${__dirname}/skills/`);
    let body = {}
    for (let i in dirs){
        // Filters Dummies
        if (dirs[i].startsWith("_")) continue;

        let skillData = {
            name: dirs[i],
            versions: [],
            latest: getLatestTag(dirs[i])
        }


        // Filters by locale
        let allVersions = fs.readdirSync(`${__dirname}/skills/${dirs[i]}`);
        for (let j in allVersions){
            let path = `${__dirname}/skills/${dirs[i]}/${allVersions[j]}`;
            if (!fs.readdirSync(`${path}/locales`).includes(`${req.params.locale}.json`)) continue;

            skillData.versions.push(allVersions[j]);
        }

        body[dirs[i]] = skillData;
    }
    res.json(body);
});

// Returns details about skill version
app.get('/skill/:skillName/:versionTag', (req, res) => {
    if (req.params.skillName.startsWith("_") || !fs.readdirSync(`${__dirname}/skills`).includes(req.params.skillName) || !fs.readdirSync(`${__dirname}/skills/${req.params.skillName}`).includes(req.params.versionTag)){
        res.json({"error": "Skill/Version not found!"});
        return;
    }

    let details = {};
    let skillManifest = JSON.parse(fs.readFileSync(`${__dirname}/skills/${req.params.skillName}/${req.params.versionTag}/manifest.json`).toString());

    details["version"] = skillManifest.version;
    details["locales"] = fs.readdirSync(`${__dirname}/skills/${req.params.skillName}/${req.params.versionTag}/locales`).map(locale => locale.split(".")[0]);
    details["dependencies"] = skillManifest.dependencies;
    res.json(details);
});

// Checks if the latest Version has same tag as requested
app.get('/update/:locale/:skillName/:version', (req, res) => {
    let tag = getLatestTag(req.params.skillName);
    let path = `${__dirname}/skills/${req.params.skillName}/${tag}`;
    let manifest = JSON.parse(fs.readFileSync(`${path}/manifest.json`).toString());
    let version = req.params.version;

    let body = {
        update: false,
        version: version
    }

    if (fs.readdirSync(`${path}/locales`).includes(`${req.params.locale}.json`) && manifest.version !== version){
        body.update = true;
        body.version = manifest.version;
    }

    res.json(body);
});

// Zips up requested skill and returns it
app.get('/download/:skillName/:versionTag', async (req, res) => {
    let tag = req.params.versionTag === "latest" ? getLatestTag(req.params.skillName) : req.params.versionTag;
    let dirPath = `${__dirname}/skills/${req.params.skillName}/${tag}`;
    await res.zip({
        files: [{
            path: dirPath,
            name: tag
        }],filename: `${req.params.skillName}.zip`});
});

app.post('/upload', (req, res) => {
    try{
        if (!req.body.skillName){
            res.send({
                status: false,
                message: 'Enter SkillName'
            });
            return;
        }
        if (!req.body.versionTag){
            res.send({
                status: false,
                message: 'Enter Version Tag'
            });
            return;
        }
        if (!req.files || Object.keys(req.files).length === 0){
            res.send({
                status: false,
                message: 'No file uploaded'
            });
            return;
        }

        let zip = new admZip(req.files.zipped.data);
        zip.extractAllTo(`${__dirname}/skills/${req.body.skillName}/${req.body.versionTag}`, true);

        updateLatest(req.body.skillName, req.body.versionTag);

        res.send({
            status: true,
            message: 'Skill Uploaded'
        });
    }catch (e) {
        res.status(500).send(e);
    }

});

function updateLatest(skill, tag){
    let versionFile = JSON.parse(fs.readFileSync(`${__dirname}/versions.json`).toString());

    if (!versionFile.hasOwnProperty(skill)) versionFile[skill] = [];

    console.log(versionFile)
    versionFile[skill] = [tag, ...versionFile[skill]];
    console.log(versionFile)

    fs.writeFileSync(`${__dirname}/versions.json`, JSON.stringify(versionFile));
}

function getLatestTag(skill){
    let versionFile = JSON.parse(fs.readFileSync(`${__dirname}/versions.json`).toString());
    return versionFile[skill][0];
}

app.listen(port,() => {
    console.log(`Server listening on: http://localhost:${port}`);
});