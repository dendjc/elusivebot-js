module.exports = async (client, member) => {
  const user = client.users.get(member) || await client.fetchUser(member);
  if(member.guild.id === client.server.guild) {
    let embed = new client.Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setAuthor(user.tag+" je napustio/la server!")
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    client.channels.get("683284090371309583").send(embed);
  }
}