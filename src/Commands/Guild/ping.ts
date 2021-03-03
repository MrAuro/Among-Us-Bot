import { Command } from '../../Interfaces';

export const command: Command = { 
    name: 'ping',
    aliases: ['p'],
    run: async(client, message, args) => {
        message.channel.send("Pinging...").then((msg) => {
            const latency = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Bot Latency: \`${latency}ms\` | API Latency: \`${Math.round(client.ws.ping)}ms\``)
        });
    }    
}