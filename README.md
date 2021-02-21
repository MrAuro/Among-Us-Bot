# Among-Us-Bot
An Among Us Bot built in Discord.JS to help users find a game.

# This bot is currently archived until the next Among Us map comes out. When It does come out I do plan on refactoring this bot.

# To Do:
If you know how to do one of these or have an idea, [make a pull request!](https://github.com/MrAuro/Among-Us-Bot/pulls).

- [ ] Looking For Group command
    -  $lfg -> Sends a message in #lfg which people react to. They are then added to a list which gets ping when 10 people are ready. 
- [x] Mute command that server mutes everyone in a voice channel
    - [ ] Really slow, takes a while to mute and deafen everyone

# How to run

## Requirements
- A bot account and token from [Discord](https://discord.com/developers)
- [NodeJS](https://nodejs.org/en/)

Clone the repo and run `start.bat` You will be asked for your token, paste it in and press enter. This will create a `.env` file which stores your token. After the node modules are installed, run the `run.bat` to start your bot! If there are any problems, try the following:

- You have a valid token in your `.env` which inside has `TOKEN=<YOUR TOKEN>`
- All of the node modules are installed. You can run `npm install` from the command line to install them or update them.

If these do not resolve your problem, [create an issue](https://github.com/MrAuro/Among-Us-Bot/issues/new/choose)

---

Launch a Heroku process for your bot
<p><a href="https://heroku.com/deploy" rel="nofollow"><img src="https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67" alt="Deploy to Heroku" data-canonical-src="https://www.herokucdn.com/deploy/button.png" style="max-width:100%;"></a></p>
