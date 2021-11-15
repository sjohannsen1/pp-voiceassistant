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
                        skillManager.getRemoteSkills(process.env.LOCALE).then(skills => {
                            skills.forEach(skill => {
                                console.log(skill.name);
                            });
                            console.log(separator);
                        }).catch(err => {
                            console.error(err);
                            console.log(separator);
                        });
                        break;

                    case "local":
                        let localSkills = skillManager.getInstalledSkills(process.env.LOCALE);
                        localSkills.forEach(skill => {
                            console.log(skill);
                        });
                        console.log(separator);
                        break;

                    default:
                        console.log("Command not found!")
                        console.log(separator);
                }
                break;

            case "updates":
                console.log("Searching for Updates...");
                let availableUpdates;

                skillManager.getUpdates(process.env.LOCALE).then(res => {
                    availableUpdates = res

                    if (Object.keys(availableUpdates).length > 0){
                        console.log("Updates Available!\n");
                        for (let i in availableUpdates){
                            console.log(`${i} Vers. ${availableUpdates[i]}`);
                        }
                    }else{
                        console.log("No Updates available!");
                    }
                    console.log(separator);
                }).catch(err => {
                    console.error(err);
                    console.log(separator);
                });
                break;

            case "download":
                skillManager.downloadSkill(args[1]).then(msg => {
                    console.log(msg);
                    console.log(separator);
                }).catch(err => {
                    console.error(err);
                    console.log(separator);
                });
                break;

            // case "register":
            //     console.log("Registering...\n");
            //     await rhasspy.registerSkills(process.env.LOCALE).catch(console.error);
            //     skillManager.loadSkills();
            //     console.log(separator);
            //     break;

            case "delete":
                await rhasspy.unregisterSkill(args[1], process.env.LOCALE).then(() => {
                    console.log(skillManager.deleteLocalSkillFiles(args[1]));
                    skillManager.loadSkills();
                }).catch(console.error);
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