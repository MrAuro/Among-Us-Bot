/*
To Do:

Looking for Group command
Queue system in Queue VC
$mute command to mute users on mobile

*/
const Discord = require("discord.js");
const nodeCMD = require("node-cmd");

const client = new Discord.Client();

require('dotenv').config();

const token = process.env.TOKEN;

const commandsList = require("./commands.json");

const prefix = "$"

var gitCommit = "Couldn't get commit"


client.on("ready", async () => {
  gitCommit = await nodeCMD.get(`git rev-parse --short HEAD`, function(err, data, stderr) {
    console.log(`${client.user.username} is online on commit ${data}`)
    // is this okay in an await function?
    client.user.setActivity("Among Us", {
      type: "PLAYING"
    })
    gitCommit = data
  })

});

client.on("voiceStateUpdate", (oldState, newState) => {
  /* TO DO

      right now the bot only drags people in if size <10 BUT
      it needs to keep track of who joins the queue and drag people in the
      game channel when someone in game channel leaves.

  */

  let oldID;
  let newID;
  if (oldState.channel) oldID = oldState.channelID;
  if (newState.channel) newID = newState.channelID;

  const vcID = client.channels.cache.find(channel => channel.name === "Queue").id;

  if (oldID !== vcID && newID === vcID) {
    // JOINED QUEUE CHAT

    // IN DEVELOPMENT
    const gamechannelID = client.channels.cache.find(channel => channel.name.includes("| Among Us")) // look for the "| Among Us" in the game channels that is changed by the $code command

    console.log(gamechannelID.members.size);
    if (gamechannelID.members.size < 10) {
      newState.member.voice.setChannel(gamechannelID);
    }

  } else if (oldID === vcID && newID !== vcID) {
    // LEFT QUEUE CHAT
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
      // Ping the bot and get the delay
      message.channel.send("Pinging...").then(msg => {
        msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
      });
      break;

    case "version":
      // Get the git version
      message.channel.send(`Commit \`${gitCommit}\``)
      break;

    case "help":
      // Sends help on the bot
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
          value: 'Currently, this bot is private however later you can add this bot to your own Discord!', // im planning on making this public
          inline: 'true'
        }, )
        .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
      message.channel.send(helpEmbed)
      break;

    case "commands":
      // List all the commands from the commands.json file
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
      // Sends the usage of a command

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

    case "code":
      // changes the vc name based on the code and region

      message.delete();
      let re = new RegExp('^[A-Za-z]+');
      if (args[1].length > 4) {
        message.channel.send("**Error:** Invalid Code")
        return;
      }
      if (args[1].length < 4) {
        message.channel.send("**Error:** Invalid Code")
        return;
      }
      if (args[2] === "NA" || args[2] === "na" || args[2] === "EU" || args[2] === "eu" || args[2] === "ASIA" || args[2] === "asia") {
        if (args[1].match(re)) {
          if (message.member.voice.channel) {
            const codeEmbed = new Discord.MessageEmbed()
              .setColor("#3A92EF")
              .setTitle(`${args[1].toUpperCase()} on ${args[2].toUpperCase()}`)
              .setDescription(`The code is ${args[1].toUpperCase()} on ${args[2].toUpperCase()}.\n\nCheck the voice channel name too!\n*sometimes the voice channel name wont change due to being rate limited*`) // make this look better
              .setTimestamp()
              .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            try {
              var codesID = message.guild.channels.cache.find(channel => channel.name === "codes").id;
              client.channels.cache.get(codesID).send(codeEmbed);
              if (!message.channel.id === codesID) {
                // check if the command wasnt sent in the codes channel
                message.channel.send(`Sent in <#${codesID}>`).then(msg => {
                  msg.delete({
                    timeout: 5000
                  })
                })
              }

            } catch (err) {
              message.channel.send(codeEmbed);
            }

            message.member.voice.channel.edit({
              name: `${args[1].toUpperCase()} | ${args[2].toUpperCase()}`
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
    // remind users of my nifty featuere :)
    message.channel.send("**Hey!** I have a feature for that!")
    codeFeature();
  }

})

client.login(token);
