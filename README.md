# Among-Us-Bot
An Among Us Bot built in Discord.JS to help users find a game.

### This project is archived. The v2 branch is a rewrite in Typescript however it does not have the VC Queue system. I got demotivated and got busy with other projects

All of the code on the master branch is really sloppy and disorganized. I wrote up this readme real quick so anyone could run this bot for themsevles

---
Clone the repo and install npm packages:
`git clone https://github.com/MrAuro/Among-Us-Bot.git`
and
`npm install`

Fill out the `.env` with the token you got from https://www.discord.com/developers :
```
TOKEN=DISCORDTOKEN
```
Finally start the bot:
`node .`

---

VC Queue:
You need 2 voice channels, one named `Queue` and another named `???? | Among Us` with a cap of 10
Join the queue channel and you will be added to the queue and moved to the among us channel.

`$overlay`
Generates a streamkit overlay for the current VC you are in

`$code {code} {region}`
Sends a code to a channel named "#codes"

`$usage {command}`
Gets the usage on a command

`$commands`
Gets all the cOMmands

`$help`
Returns help on the bot

`$version`
Gets the commit

`$dead` `$d`
Unmutes you from the voice channel

`$mute` `$m` 
Mutes everyone in the voice channel
**THIS GETS RATE LIMITED QUICK**

`$ping`
Pings the bot

