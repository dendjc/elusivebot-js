const Discord = require("discord.js");
const db = require("quick.db");
const guild = require("../supportguild.json");

module.exports = async (client, member) => {
  if(member.guild.id === guild.id) {
    client.channels.cache.get(guild.membercount).setName("Broj članova: "+member.guild.memberCount);
  }
  let user = client.users.cache.get(member.id); 
  let i = 0;
  let msglogs = await db.fetch(`logs_${member.guild.id}_msglogs`);
  if(msglogs === null) i++;
  if(i == 0) msglogs = client.channels.cache.get(msglogs);
  if(msglogs === undefined || msglogs === null) i++;
  if(member.guild.id === client.server.guild) {
    member.send(client.server.welcomemsg).catch(err => {
      if(i == 0) {
        let rainbow = client.emojis.cache.get("692702771002212362");
        let msgEmbed = new Discord.MessageEmbed()
        .setAuthor("Novi član se pridružio serveru!", user.displayAvatarURL())
        .setDescription(rainbow+" | Novi član **("+member.toString()+")** se upravo pridružio serveru, ali mu nisam mogao poslati privatnu poruku!\nVjerovatno je tom korisniku zaključan DM!")
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        .setTimestamp();
        msglogs.send(msgEmbed);
      }
    });
  }
  let logs = await db.fetch(`logs_${member.guild.id}_memberlogs`);
  if(logs === null) return;
  logs = client.channels.cache.get(logs);
  if(logs === undefined || logs === null) return;
  let parrot = client.emojis.cache.get("692702679335698434");
  let embed = new client.Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setAuthor("Novi član se upravo pridružio serveru!", user.displayAvatarURL())
  .setDescription(parrot.toString()+" | **"+member.toString()+"**, dobrodošao/la na\n**"+member.guild.name+"**")
  .setImage(member.guild.iconURL({ size: 512 }))
  .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
  .setTimestamp();
  logs.send(embed);
}