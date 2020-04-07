const db = require("quick.db");
const guild = require("../supportguild.json");
const Timeout = require("smart-timeout");

module.exports = async (client, member) => {
  if(member.guild.id === guild.id) {
    client.channels.cache.get(guild.membercount).setName("Broj članova: "+member.guild.memberCount);
  }
  const user = client.users.cache.get(member.id) || await client.users.fetch(member.id);
  const usermoney = await db.fetch(`money_${member.guild.id}_${user.id}`);
  if(usermoney !== null) db.delete(`money_${member.guild.id}_${user.id}`);
  const userbank = await db.fetch(`bank_${member.guild.id}_${user.id}`);
  if(userbank !== null) db.delete(`bank_${member.guild.id}_${user.id}`);
  const userdaily = await db.fetch(`daily_${member.guild.id}_${user.id}`);
  if(userdaily !== null) db.delete(`daily_${member.guild.id}_${user.id}`);
  const userweekly = await db.fetch(`weekly_${member.guild.id}_${user.id}`);
  if(userweekly !== null) db.delete(`weekly_${member.guild.id}_${user.id}`);
  const mutetime = await db.fetch(`mutetime_${member.guild.id}_${user.id}`);
  if(mutetime !== null) db.delete(mutetime.ID);
  if(Timeout.exists("mute_" + member.guild.id + "_" + member.id)) Timeout.clear("mute_" + member.guild.id + "_" + member.id);
  let logs = await db.fetch(`logs_${member.guild.id}_memberlogs`);
  if(logs === null) return;
  logs = client.channels.cache.get(logs);
  if(logs === undefined || logs === null) return;
  let embed = new client.Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setAuthor(user.tag+" je napustio/la server!")
  .setFooter(client.config.embed.footer)
  .setTimestamp();
  logs.send(embed);
}