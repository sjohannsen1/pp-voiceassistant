const app = require("express")();
const zip = require("express-easy-zip");

const port = process.env.PORT;

app.use(zip());

app.get('/download/:skillName', async function(req, res) {
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