import * as Discord from 'discord.js';
import { GuildChannel, TextChannel } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'code',
    aliases: [],
    description: 'Send a game code to a channel name `#codes`',
    run: async (client, message, args) => {
        // Codes are 6 characters long, A-Z and capitalizedd
        const codesRegex: RegExp = new RegExp(/^[A-Z]{6}$/);

        var codesChannel: GuildChannel = message.guild.channels.cache.find((channel) => channel.name === 'codes');
        if (!codesChannel || codesChannel.type !== 'text')
            return message.channel.send(`I could not find a text channel with the name of \`#codes\`. Please create one, or make sure I have permission to view it.`);

        if (codesRegex.test(args[0])) {
            // Codes only end with G or F, only got endings with these 2 in about 50 lobbys
            if (args[0].endsWith('G') || args[0].endsWith('F')) {
                const codesEmbed = new Discord.MessageEmbed()
                    .setColor('#5CFF35')
                    .setAuthor(`Code: ${args[0].toUpperCase()}`)
                    .setDescription(`The code for Among Us is ${args[0].toUpperCase()}`)
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}`);

                (client.channels.cache.get(codesChannel.id) as TextChannel).send(codesEmbed).catch((err) => {
                    // Check if the bot has permission to send messages in the chanenl
                    if (err.message === 'Missing Permissions') {
                        return message.channel.send(`I do not have permission to send messages in that channel.`);
                    }
                });
            } else {
                return message.channel.send('The provided code is invalid (A-Z, 6 characters long, must end with G or F)');
            }
        } else {
            return message.channel.send('The provided code is invalid (A-Z, 6 characters long, must end with G or F)');
        }
    },
};
