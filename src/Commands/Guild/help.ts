import { Command } from '../../Interfaces';
import * as Discord from 'discord.js';

export const command: Command = {
    name: 'help',
    aliases: [],
    description: 'Returns help on the bot',
    run: async (client, message, args) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#5CFF35')
            .setTitle(`${client.user.username}`)
            .setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            .addFields({
                // @ts-ignore ---- for some reason typescript doesnt like this, but the bot still works fine
                name: 'Lorem ipsum dolor sit amet',
                value: 'Cras vitae tellus eu erat bibendum dignissim. Proin id lorem nisi. ',
                inline: 'true',
            })
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(helpEmbed);
    },
};
