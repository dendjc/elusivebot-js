module.exports = (client, member) => {
  member.send(`Dobrodošao/la na ${member.guild}. Uživaj!`);
  if(member.guild.id === client.server.guild) {
    let embed = new client.Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setAuthor("Novi član se upravo pridružio serveru!")
    .setDescription("**"+member+"**, dobrodošao/la na\n**"+member.guild+"**")
    .setImage(member.guild.iconURL)
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    client.channels.get("683284090371309583").send(embed);
  }
}