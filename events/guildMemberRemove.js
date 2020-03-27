const db = require("quick.db");

module.exports = async (client, member) => {
  const user = client.users.get(member) || await client.fetchUser(member);
  const usermoney = await db.fetch(`money_${member.guild.id}_${user.id}`);
  if(usermoney !== null) db.delete(`money_${member.guild.id}_${user.id}`);
  const userbank = await db.fetch(`bank_${member.guild.id}_${user.id}`);
  if(userbank !== null) db.delete(`bank_${member.guild.id}_${user.id}`);
  const userdaily = await db.fetch(`daily_${member.guild.id}_${user.id}`);
  if(userdaily !== null) db.delete(`daily_${member.guild.id}_${user.id}`);
  const userweekly = await db.fetch(`weekly_${member.guild.id}_${user.id}`);
  if(userweekly !== null) db.delete(`weekly_${member.guild.id}_${user.id}`);
  let logs = await db.fetch(`logs_${member.guild.id}_memberlogs`);
  if(logs === null) return;
  logs = client.channels.get(logs);
  if(logs === undefined || logs === null) return;
  let embed = new client.Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setAuthor(user.tag+" je napustio/la server!")
  .setFooter(client.config.embed.footer)
  .setTimestamp();
  logs.send(embed);
}