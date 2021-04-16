const Discord = require("discord.js");
const db = require("quick.db");
const guild = require("../supportguild.json");

module.exports = async (client, member) => {
  let pikachu = client.emojis.cache.get("720246672571105291");
  if (member.guild.id === guild.id) {
    member.guild.channels.cache
      .get(guild.membercount)
      .setName("Member Count: " + member.guild.memberCount);
    member.roles.add("720037444749230190");
  }
  let i = 0;
  let msglogs = await db.fetch(`logs_${member.guild.id}_msglogs`);
  if (msglogs === null) i++;
  if (i == 0) msglogs = client.channels.cache.get(msglogs);
  if (msglogs === undefined || msglogs === null) i++;
  if (member.guild.id === client.server.guild) {
    member.send(client.server.welcomemsg).catch(err => {
      if (i == 0) {
        let msgEmbed = new Discord.MessageEmbed()
          .setAuthor(
            "Novi član se pridružio serveru!",
            member.user.displayAvatarURL()
          )
          .setDescription(
            pikachu.toString() +
              " | Novi član **(" +
              member.toString() +
              ")** se upravo pridružio serveru, ali mu nisam mogao poslati privatnu poruku!\nVjerovatno je tom korisniku zaključan DM!"
          )
          .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
          .setTimestamp();
        msglogs.send(msgEmbed);
      }
    });
    client.channels.cache
      .get("720037475401072691")
      .send(
        pikachu.toString() +
          " Novi član " +
          member.toString() +
          " se pridružio/la serveru.Poželite mu/joj dobrodošlicu!"
      )
      .then(msg => msg.react(pikachu));
  }
  let logs = await db.fetch(`logs_${member.guild.id}_memberlogs`);
  if (logs === null) return;
  logs = client.channels.cache.get(logs);
  if (logs === undefined || logs === null) return;
  let embed = new client.Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setAuthor(
      "Novi član se upravo pridružio serveru!",
      member.user.displayAvatarURL()
    )
    .setDescription(
      pikachu.toString() +
        " | **" +
        member.toString() +
        "**, dobrodošao/la na\n**" +
        member.guild.name +
        "**"
    )
    .setImage(member.guild.iconURL({ dynamic: true, size: 512 }))
    .setFooter("Elusive", client.user.displayAvatarURL())
    .setTimestamp();
  logs.send(embed);
};
