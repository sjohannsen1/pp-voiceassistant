const skillManager = require("./skillManager.js");
const readline = require("readline");

const separator = "\n----------------------------------\n";

function startCLI(locale = "de_DE"){
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
                                let installedVersions = "";

                                if (skill.installed.length > 0){
                                    installedVersions = " ("
                                    skill.installed.forEach(version => installedVersions = `${installedVersions}${version}, `);
                                    installedVersions = installedVersions.substr(0, installedVersions.length-2) + ") ";
                                }

                                let availableVersions = "";
                                skill.versions.forEach(version => availableVersions = `${availableVersions}${version}, `)

                                console.log(`${skill.name}${installedVersions}: ${availableVersions.substr(0, availableVersions.length-2)}`);
                            });
                            console.log(separator);
                        }).catch(err => {
                            console.error(err);
                            console.log(separator);
                        });
                        break;

                    case "local":
                        let localSkills = skillManager.getSkillsOverview(process.env.LOCALE);

                        let activeSkills = localSkills.filter(skill => skill.active === true);
                        let inactiveSkills = localSkills.filter(skill => skill.active === false);


                        console.log("Active:\n");
                        activeSkills.forEach(skill => console.log(`${skill.name}: ${skill.version}\n`));

                        console.log("Inactive:\n");
                        inactiveSkills.forEach(skill => console.log(`${skill.name}: ${skill.version}\n`));
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
                let skillDownload = args[1] ? args[1] : "HelloWorld";
                let tagDownload = args[2] ? args[2] : "latest";


                skillManager.downloadSkill(skillDownload, tagDownload).then((versionTag) => {
                    skillManager.setActivateFlag(skillDownload, false).then(()=> {
                        skillManager.setVersion(skillDownload, versionTag);
                        skillManager.loadSkills(locale);

                        console.log(`Successfully downloaded skill '${skillDownload} ${versionTag}'!`);
                        console.log(separator);
                    })
                }).catch(() => {
                    console.log(`Unable to download skill '${skillDownload} ${tagDownload}'!`);
                    console.log(separator);
                });
                break;

            case "delete":
                let skillDelete = args[1] ? args[1] : "HelloWorld";
                let tagDelete = args[2] ? args[2] : "1.0";

                skillManager.deactivateSkill(skillDelete, locale).then(() => {
                    skillManager.deleteLocalSkillFiles(skillDelete).then(() => {
                        skillManager.loadSkills(locale);
                        console.log(`Successfully deleted skill '${skillDelete} ${tagDelete}'!`);
                        skillManager.loadSkills(locale);
                        console.log(separator);
                    })
                }).catch(() => {
                    console.log(`Unable to delete skill '${skillDelete} ${tagDelete}'!`);
                    console.log(separator);
                });
                break;

            case "activate":
                let skillActivate = args[1] ? args[1] : "HelloWorld";
                skillManager.activateSkill(skillActivate, locale)
                    .then(() => {
                        console.log(`Successfully activated skill '${skillActivate}'!`);
                        console.log(separator);
                    })
                    .catch(() => {
                        console.log(`Unable to activate skill '${skillActivate}'!`);
                        console.log(separator);
                    });
                break;

            case "deactivate":
                let skillDeactivate = args[1] ? args[1] : "HelloWorld";
                skillManager.deactivateSkill(skillDeactivate, locale)
                    .then(() => {
                        console.log(`Successfully activated skill '${skillDeactivate}'!`);
                        console.log(separator);
                    })
                    .catch(() => {
                        console.log(`Unable to activate skill '${skillDeactivate}'!`);
                        console.log(separator);
                    });
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