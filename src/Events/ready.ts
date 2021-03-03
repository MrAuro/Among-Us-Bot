import { Event } from "../Interfaces";

export const event: Event = {
    name: 'ready',
    run: (client) => {
        require('child_process').exec('git rev-parse --short HEAD', function(err, stdout) {
            console.log(`${client.user.username} is online in ${client.guilds.cache.size} servers on commit ${stdout}`);
        });

        client.user.setActivity(client.config.clientActivity, {
            type: "PLAYING",
          });
        
    }
}