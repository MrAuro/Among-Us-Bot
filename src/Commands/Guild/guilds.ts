import { Command } from '../../Interfaces';

export const command: Command = { 
    name: 'guilds',
    aliases: ['servers'],
    description: 'Returns the amount of guilds the bot is currently in',
    run: async(client, message, args) => {
        message.channel.send(`I am currently in ${client.guilds.cache.size} servers!`);
    }    
}