const Discord = require("discord.js");
const db = require("quick.db");
const guild = require("../supportguild.json");
const Timeout = require("smart-timeout");

module.exports = client => {
  console.log(
    `Bot je startovan, sa ${client.users.size} korisnika, u ${client.channels.size} kanala na ${client.guilds.size} servera.`
  ); // Example of changing the bot's playing game to something useful. `client.user` is what the // docs refer to as the "ClientUser".

  client.user.setActivity(
    `${client.config.ime} || v${client.config.verzija} || ʙᴇᴛᴀ`
  );
  client.guilds.cache.forEach(gg => {
    if(gg.id === guild.id) {
      client.channels.cache.get(guild.membercount).setName("Broj članova: "+gg.memberCount);
    }
    const func = async () => {
      let mute = await db.startsWith(`mutetime_${gg.id}`);;
      for(let i = 0; i < mute.length; i++) {
        let userid = mute[i].ID.split("_")[2];
        let mutetime = await db.fetch(`mutetime_${gg.id}_${userid}`);
        let time = mutetime.time - (Date.now() - mutetime.date);
        if(time > 0) {
          Timeout.set("mute_" + gg.id + "_" + userid, async() => {
            try {
              let member = gg.members.cache.get(userid);
              let muted = gg.roles.cache.find(r => r.name === "Muted");
              if(!muted) {
                muted = await gg.roles.create({
                  data: {
                    name: "Muted",
                    permissions: []
                  }
                })
                .then(role => {
                  gg.channels.forEach(channel => {
                    channel.overwritePermissions(role.id, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                    });
                  });
                });
              }
              member.roles.remove(muted).then(async() => {
                let i = 0;
                let user = client.users.cache.get(userid);
                let channel = await db.fetch(`mutetime_${gg.id}_${userid}`, { target: ".channel" });
                channel = gg.channels.cache.get(channel);
                if(channel === undefined || channel === null) i++;
                channel.send("Istekao je privremeni mute člana "+user.tag);
                
                db.delete(`mutetime_${gg.id}_${userid}`);
                
                i = 0;
                let logs = await db.fetch(`logs_${gg.id}_msglogs`);
                if(logs === null) i++;
                if(i == 0) logs = gg.channels.cache.get(logs);
                if(logs === undefined || logs === null) i++;
  
                let embed = new Discord.MessageEmbed()
                .setAuthor("Istekao je privremeni mute člana "+user.tag)
                .setThumbnail(user.displayAvatarURL())
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
                .setTimestamp();
                if(i == 0) logs.send(embed);
              });
            }
            catch(err) {
              console.log(err);
            }
          }, time);
        }
        else {
          let member = gg.members.cache.get(userid);
          let muted = gg.roles.cache.find(r => r.name === "Muted");
          if(!muted) {
            muted = await gg.roles.create({
              data: {
                name: "Muted",
                permissions: []
              }
            }).then(role => {
              gg.channels.forEach(channel => {
                channel.overwritePermissions(role.id, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
            });
          }
          member.roles.remove(muted).then(() => db.delete(`mutetime_${gg.id}_${userid}`));
        }
      }
    }
    func();
  });
};
