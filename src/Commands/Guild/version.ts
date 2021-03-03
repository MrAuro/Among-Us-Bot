import { Command } from '../../Interfaces';

export const command: Command = { 
    name: 'version',
    aliases: ['v'],
    run: async(client, message, args) => {
        require('child_process').exec('git rev-parse --short HEAD', function(err, stdout) {
            message.channel.send(`Currently on git commit \`${stdout}\``);
        });
    }    
}