const ms = require('ms');
exports.run = (client, message, args) => {
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
    if (!time) return message.channel.send("Moraš napisati dužinu lockdowna u satima, minutama ili sekundama!");
    if(isNaN(time)) return message.channel.send("Nisi pravilno napisao/la dužinu vremena!");
  
    if(time == -1) {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      }).then(() => message.channel.send("**Kanal je zaključan** na neodređeno!"));
      return;
    }
  
    if(time == 0) {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        message.channel.send("**Lockdown završen!**");
        clearTimeout(client.lockit[message.channel.id]);
        delete client.lockit[message.channel.id];
      });
      return;
    }
  
    if(time < 10000 || time > 36000000) return message.channel.send("Ne možeš zaključati kanal kraće od 10s ili duže od 1h!");

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('**Lockdown završen!**');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`**Kanal zaključan** na ${ms(ms(time), { long:true })}.`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(message.channel.send('**Lockdown završen!**')).catch(console.error);
                    delete client.lockit[message.channel.id];
                }, ms(time));

            }).catch(error => {
                console.log(error);
            });
        });
    }
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ld', 'lock'],
    permLevel: 0
};

exports.help = {
    name: 'lockdown',
    description: 'Locks a channel for a set duration (in hrs, mins or secs).',
    usage: 'lockdown <duration>'
};