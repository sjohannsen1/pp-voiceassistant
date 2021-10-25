const rhasspy = require("./rhasspy.js");
const skillManager = require("./skillManager.js");
const readline = require("readline");

const separator = "\n----------------------------------\n";

function startCLI(){
    console.log(separator);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', async (line) => {
        console.log("\n")
        let args = line.split(" ");
        switch (args[0]) {
            case "skills":
                switch (args[1]){
                    case "remote":
                        try {
                            let remoteSkills = await skillManager.getRemoteSkills();
                            remoteSkills.forEach(skill => {
                                console.log(skill);
                            });
                        }catch (e) {
                            console.error(e);
                        }
                        break;


                    case "local":
                        let localSkills = skillManager.getInstalledSkills(process.env.LOCALE);
                        localSkills.forEach(skill => {
                            console.log(skill);
                        });
                        break;

                    default:
                        console.log("Command not found!")
                }
                console.log(separator);
                break;

            case "download":
                try{
                    console.log("Downloading in Background...");
                    skillManager.downloadSkill(args[1]);
                }catch (err){
                    console.error(err);
                }
                console.log(separator);
                break;

            case "register":
                console.log("Registering...\n");
                await rhasspy.registerSkills(process.env.LOCALE).catch(console.error);
                //TODO call reload of skill files
                console.log(separator);
                break;

            default:
                console.log("Command not found!")
                console.log(separator);
        }
    })
}

module.exports = {
    startCLI
}