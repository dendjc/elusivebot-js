module.exports = async (client, oldMessage, newMessage) => {
  if(oldMessage.guild.id === client.server.guild) {
    if(oldMessage.guild.id !== client.server.guild) return;
    if(client.user === oldMessage.author) return;
    if(oldMessage != newMessage) {
      let embed = new client.Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setAuthor("Poruka je uređena!")
      .setDescription("**Kanal:** "+oldMessage.channel.name)
      .addField("**Stara poruka**", oldMessage.cleanContent)
      .addField("**Nova poruka**", newMessage.cleanContent)
      .setFooter("Autor poruke: "+oldMessage.author.username+" | "+client.config.ime)
      .setTimestamp();
      client.channels.get(client.server.msglogs).send(embed);
    }
  }
}