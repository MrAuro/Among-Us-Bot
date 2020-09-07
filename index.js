const Discord = require("discord.js");
const client = new Discord.Client();

const token = require("./token.json");

const prefix = "$"

client.on("ready", () => {
    console.log(`${client.user.username} is online!`)
    client.user.setActivity("Among Us", { type: "PLAYING"})
});

client.login(token.token);