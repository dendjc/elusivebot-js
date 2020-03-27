const db = require("quick.db");

module.exports = async (client, member) => {
  member.send(`Dobrodošao/la na ${member.guild}. Uživaj!`);
  let logs = await db.fetch(`logs_${member.guild.id}_memberlogs`);
  if(logs === null) return;
  logs = client.channels.get(logs);
  if(logs === undefined || logs === null) return;
  let embed = new client.Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setAuthor("Novi član se upravo pridružio serveru!")
  .setDescription("**"+member+"**, dobrodošao/la na\n**"+member.guild+"**")
  .setImage(member.guild.iconURL)
  .setFooter(client.config.embed.footer)
  .setTimestamp();
  logs.send(embed);
}