const Discord = require("discord.js");
const client = new Discord.Client();

const token = require("./token.json");

const commandsList = require("./commands.json");

const prefix = "$"

client.on("ready", () => {
    console.log(`${client.user.username} is online!`)
    client.user.setActivity("Among Us", {
        type: "PLAYING"
    })
});

client.on("message", message => {
    const args = message.content.substr(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    if(message.author.bot){ return; }

    switch (args[0]) {
        case "ping":
            message.channel.send("Pinging...").then(msg => {
                msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
            });
            break;

        case "help":
            // do this!
            message.channel.send("Help")
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
                        console.log(message.member.voice.channel.id)
                        
                        const codeEmbed = new Discord.MessageEmbed()
                        .setColor("#3A92EF")
                        .setTitle(`${args[1]} on ${args[2]}`)
                        .setDescription(`The code is ${args[1]} on ${args[2]}.\n\nCheck the voice channel name too!\n*sometimes the voice channel name wont change due to being rate limited*`)
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                       message.channel.send(codeEmbed);

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
    if(message.author.bot){ return; }

    function codeFeature(){
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

    if (args.includes("code is")){
        message.channel.send("**Hey!** I have a feature for that!")
        codeFeature();
    }

})

client.login(token.token);