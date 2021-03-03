import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'commands',
    aliases: [],
    description: 'Lists all of the commands the bot has',
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed().setColor('#5CFF35').setAuthor('Commands').setDescription('List of all of the available commands');
        client.commands.forEach((command) => {
            var aliasesList = `\`${command.name}\` `;
            for (var j in command.aliases) {
                aliasesList = aliasesList + `\`${command.aliases[j]}\` `;
            }
            embed.addField(`${command.name}`, `**Aliases:** ${aliasesList}\n${command.description}`);
        })
        embed.setTimestamp().setFooter(`Requested by ${message.author.username}`);
        message.channel.send(embed);
    },
};
