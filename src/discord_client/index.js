const mqtt = require("mqtt"),
    fs = require("fs"),
    rhasspy = require("../client/rhasspy.js"),
    { Client, Intents } = require('discord.js')
bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] })//({intents: Object.keys(Intents.FLAGS)})

var client,
    users = []

//Kann weg?    
bot.once('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`)
})

//Initializes MQTT client and subscribes to topics
async function init() {
    client = mqtt.connect(`mqtt://${process.env.MQTTHOST}`)

    client.on("connect", function () {
        console.log("connected")
        client.subscribe('hermes/tts/say')
        client.subscribe('bot')
        client.on('message', (topic, message) => {
            if (topic == 'hermes/tts/say') {
                let formatted = JSON.parse(message);
                sendMessage(formatted.text)
            }
            else {
                try{
                    JSON.parse(message).forEach(sendMessage)
                }catch{
                    console.log(message.toString())
                    sendMessage(message.toString())
                }
                
            }

        })

    })
}
//subscribes user
function registerNewUser(user) {
    if (!users.includes(user)) {
        user.send("neuer Nutzer registriert. Schreibe \"Benachrichtigungen aus\" oder \"Deabonnieren\" um keine Nachrichten mehr von mir zu erhalten")
        users.push(user)
        return false
    }
    return true
}

//unsubscribes user
function unregisterUser(user) {
    users = users.filter((cur) => { return (cur != user) })
}


//eventlistener: bot receives message
bot.on('messageCreate', message => {

    //bot should not reply to their own messages
    if (message.author !== bot.user) {

        //unsubscribe
        if (message.content.toLowerCase().includes("deabonnieren" || "unsubscribe" || "benachrichtigungen aus")) {
            message.author.send("Ok, ich höre auf dich zu benachrichtigen")
            unregisterUser(message.author)
        }
        //info to add new radiostation
        if (message.content.includes("neuer radiosender")) {
            message.author.send("sende die Daten des Senders in folgendem Format:")
            message.author.send("name: sendername url: url.de")
        }
        //info to add new song
        if (message.content.includes("neuer song" || "neues Lied")) {
            message.author.send("sende die Daten des Lieds in folgendem Format:")
            message.author.send("name: sendername artist: name path: pfad_zu_datei")
        }
        //save new song
        if (message.content.includes("path")) {
            let substr = message.content.split("name: ")[1].split(" artist: ")
            let artist = substr[1].split(" path: ")
            let path = artist[1]
            artist = artist[0]
            let name = substr[0]

            rhasspy.postSlots("songs", `${name} von ${artist}`).then(rhasspy.trainRhasspy).catch(console.log)
            
            fs.readFile(process.env.PATH_SONGS, (err, data) => {
                if (err) {
                    message.author.send("Der Musikplayer-Skill ist nicht installiert")
                    return
                }
                let content = JSON.parse(data)
                content.songs.push({ name: name, artist: artist, path: path })

                fs.writeFile(process.env.PATH_SONGS, JSON.stringify(content), err => { if (err) message.author.send("Momentan kann ich die Eingabe leider nicht speichern. Versuche es später erneut!") })
            })

        }
        //save new radiostation
        if (message.content.includes("url")) {
            let substr = message.content.split("name: ")[1].split(" url: ")
            let url = substr[1]
            let name = substr[0]
            rhasspy.postSlots("radiostations", name).then(rhasspy.trainRhasspy).catch(console.log)
            fs.readFile(process.env.PATH_RADIO, (err, data) => {
                if (err) {
                    message.author.send("Der Musikplayer-Skill ist nicht installiert")
                    return
                }
                let content = JSON.parse(data)
                content.stations.push({ name: name, url: url })

                fs.writeFile(process.env.PATH_RADIO, JSON.stringify(content), err => { if (err) message.author.send("Momentan kann ich die Eingabe leider nicht speichern. Versuche es später erneut!") })
            })

        }

        //if user is subscribed, they can access rhasspy via bot
        if (registerNewUser(message.author))
            rhasspy.postToRhasspy("/api/text-to-intent", message.content)
    }
})

//function to send messages to all subscriber
function sendMessage(message) {
    users.forEach(user => { user.send(message) })
    if (!users) console.log("kein user registriert")
}

bot.login(process.env.DISCORD_TOKEN)
init()

