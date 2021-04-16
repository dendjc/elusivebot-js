const ms = require("ms");

exports.run = async (client, message, args) => {
    let allowed = false;
    let conf = exports.conf;
    if(message.member.permissions.has("MANAGE_CHANNELS")) allowed = true;
    conf.allowed.forEach(a => {
      if(!allowed && message.author.id === a) allowed = true;
    });

    if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
    if(!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time) return message.channel.send("Moraš napisati dužinu lockdowna u satima, minutama ili sekundama!");
    if(isNaN(time)) return message.channel.send("Nisi pravilno napisao/la dužinu vremena!");
  
    if(time == -1) {
      message.channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: false
      }).then(() => message.channel.send("**Kanal je zaključan** na neodređeno!"));
      return;
    }
  
    if(time == 0) {
      message.channel.updateOverwrite(message.guild.id, {
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
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            message.channel.send('**Lockdown završen!**');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send(`**Kanal zaključan** na ${ms(ms(time), { long:true })}.`).then(() => {

                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.updateOverwrite(message.guild.id, {
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
    allowed: ["649708455342505984"]
}
exports.help = {
    name: 'lockdown',
    description: 'zaključavanje kanala',
    usage: 'lockdown [vrijeme u ms]',
    category: 'admin',
    listed: true
};