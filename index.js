const Discord = require("discord.js");
const nodeCMD = require("node-cmd");

const client = new Discord.Client();

const token = require("./token.json");

const commandsList = require("./commands.json");

const prefix = "$"

var gitCommit = "?";


client.on("ready", () => {
    nodeCMD.get(`git rev-parse --short HEAD`, function (err, data, stderr) {
        console.log(data);
        gitCommit = data;
    })
    console.log(`${client.user.username} is online on commit ${gitCommit}`)
    client.user.setActivity("Among Us", {
        type: "PLAYING"
    })
});

// let queueID = client.channels.cache.find(channel => channel.name === "Queue").id; // ✅

client.on("voiceStateUpdate", (oldState, newState) => {
    // AHHAJFHsgdlkjdfgk i spent hours trying to fix this

    /* TO DO

        right now the bot only drags people in if size <10 BUT
        it needs to keep track of who joins the queue and drag people in the 
        game channel when someone in game channel leaves.

    */

    let oldID;
    let newID;
    if (oldState.channel) oldID = oldState.channelID;
    if (newState.channel) newID = newState.channelID;

    console.log("test") // this is logged
    const vcID = client.channels.cache.find(channel => channel.name === "Queue").id;

    if (oldID !== vcID && newID === vcID) {
        console.log("joined") // this is not logged

        const gamechannelID = client.channels.cache.find(channel => channel.id === '752330521526272141')
        console.log(gamechannelID.members.size);
        if (gamechannelID.members.size < 10) {
            newState.member.voice.setChannel(gamechannelID);
        }

    } else if (oldID === vcID && newID !== vcID) {
        console.log("left") // this is not logged
    }
})

client.on("message", message => {
    const args = message.content.substr(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) {
        return;
    }

    switch (args[0]) {
        case "ping":
            message.channel.send("Pinging...").then(msg => {
                msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
            });
            break;

        case "version":
            message.channel.send(`Commit \`${gitCommit}\``)
            break;

        case "move":
            const user = message.mentions.members.first();
            user.voice.setChannel('752649460005470259');
            const vc = client.channels.cache.find(channel => channel.id === '752649460005470259')
            console.log(vc.members.size);
            break;

        case "eeee":
            const eeee = client.channels.cache.find(channel => channel.id === '752649460005470259')
            console.log(eeee.members.size);
            break;

        case "help":
            const helpEmbed = new Discord.MessageEmbed()
                .setColor("#5CFF35")
                .setTitle("Among Us Bot Help")
                .setDescription("There are many commands with Among Us Bot. Most of them you don't even have to do anything to prep!\nBy using the `$commands` command you can view all of the commands.")
                .addFields({
                    name: 'Github',
                    value: '[Contribute Here!](https://www.github.com/mrauro/among-us-bot/)',
                    inline: 'true'
                }, {
                    name: 'Twitter',
                    value: '[Follow me on Twitter!](https://www.twitter.com/auror6s)',
                    inline: 'true'
                }, {
                    name: 'Invite',
                    value: 'Currently, this bot is private however later you can add this bot to your own Discord!',
                    inline: 'true'
                }, )
                .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            message.channel.send(helpEmbed)
            break;

        case "commands":
            const commandsEmbed = new Discord.MessageEmbed()
                .setColor("#5CFF35")
                .setTitle("Among Us Bot Commands")
                .setDescription("Below are all of the commands associated with the bot!")
            for (var i = 0; i < commandsList.length; i++) {
                commandsEmbed.addField(commandsList[i].command, commandsList[i].usage)
            }
            commandsEmbed.setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            message.channel.send(commandsEmbed)
            break;

        case "usage":
            // this needs to check if there is no command in commands.json
            if (args[1] === undefined) {
                for (var i = 0; i < commandsList.length; i++) {
                    // this is unnessacary, fix this later.
                    if (commandsList[i].command == "usage") {

                        const usageUsageEmbed = new Discord.MessageEmbed()
                            .setColor("#66B66E")
                            .setTitle(`Usage of: ${commandsList[i].command}`)
                            .setDescription(commandsList[i].usage)
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                        message.channel.send(usageUsageEmbed);
                    }
                }
            }
            for (var i = 0; i < commandsList.length; i++) {
                if (commandsList[i].command == args[1]) {
                    const usageEmbed = new Discord.MessageEmbed()
                        .setColor("#66B66E")
                        .setTitle(`Usage of: ${commandsList[i].command}`)
                        .setDescription(commandsList[i].usage)
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                    message.channel.send(usageEmbed);
                }
            }
            break;

        case "setup":
            // unnessacary?
            var codesID = message.guild.channels.find("id", args[1])
            var queueID = message.guild.channels.find("id", args[2])
            var gameplayID = message.guild.channels.find("id", args[3])
            try {
                if (args[1] === codesID) {
                    // Is args a channel?
                    if (codesID.type === "text") {
                        // Is codesID a text channel?
                        if (args[2] === queueID) {
                            if (queueID.type === "voice") {
                                if (args[3] === gameplayID) {
                                    if (gameplayID.type === "voice") {
                                        // FINALLY IN
                                        // Do stuff...
                                    }
                                }
                            }
                            // Gameplay VC
                        }
                    }
                }
            } catch (err) {
                message.channel.send("Unknown Error")
            }
            break;

        case "code":
            message.delete();
            let re = new RegExp('^[A-Z]+');
            if (args[1].length > 4) {
                message.channel.send("**Error:** Invalid Code")
                return;
            }
            if (args[1].length < 4) {
                message.channel.send("**Error:** Invalid Code")
                return;
            }
            if (args[2] === "NA" || args[2] === "EU" || args[2] === "ASIA") {
                if (args[1].match(re)) {
                    if (message.member.voice.channel) {
                        const codeEmbed = new Discord.MessageEmbed()
                            .setColor("#3A92EF")
                            .setTitle(`${args[1]} on ${args[2]}`)
                            .setDescription(`The code is ${args[1]} on ${args[2]}.\n\nCheck the voice channel name too!\n*sometimes the voice channel name wont change due to being rate limited*`)
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                        try {
                            var codesID = message.guild.channels.cache.find(channel => channel.name === "codes").id;
                            client.channels.cache.get(codesID).send(codeEmbed);
                            message.channel.send(`Sent in <#${codesID}>`).then(msg => {
                                msg.delete({
                                    timeout: 5000
                                })
                            })
                        } catch (err) {
                            message.channel.send(codeEmbed);
                        }

                        message.member.voice.channel.edit({
                            name: `${args[1]} | ${args[2]}`
                        })
                    } else {
                        message.channel.send("**Error:** Please join a voice channel.")
                    }

                } else {
                    message.channel.send("**Error:** Invalid Code")
                }
            } else {
                message.channel.send("**Error:** Invalid Region (NA, EU, or ASIA)")
            }
    }
})

client.on("message", message => {
    const args = message.content.toLowerCase();
    if (message.author.bot) {
        return;
    }

    function codeFeature() {
        for (var i = 0; i < commandsList.length; i++) {
            // this is unnessacary, fix this later.
            if (commandsList[i].command == "code") {

                const usageUsageEmbed = new Discord.MessageEmbed()
                    .setColor("#66B66E")
                    .setTitle(`Usage of: ${commandsList[i].command}`)
                    .setDescription(commandsList[i].usage)
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                message.channel.send(usageUsageEmbed);
            }
        }
    }

    if (args.includes("code is")) {
        message.channel.send("**Hey!** I have a feature for that!")
        codeFeature();
    }

})

client.login(token.token);