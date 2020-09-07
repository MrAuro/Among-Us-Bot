const Discord = require("discord.js");
const client = new Discord.Client();

const token = require("./token.json");

const commandsList = require("./commands.json");

const prefix = "$"

client.on("ready", () => {
    console.log(`${client.user.username} is online!`)
    client.user.setActivity("Among Us", { type: "PLAYING"})
});

client.on("message", message => {
    const args = message.content.substr(prefix.length).split(" ");
    if(!message.content.startsWith(prefix)) return;

    switch(args[0]){
        case "ping":
            message.channel.send("Pinging...").then(msg => {
                msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
              });
        break;

        case "help":
            message.channel.send("Help")
        break;

        case "usage":
              for(var i = 0; i < commandsList.length; i++){
                if(commandsList[i].command == args[1])
                {
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
            
    }
})

client.login(token.token);