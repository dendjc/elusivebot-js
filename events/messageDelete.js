module.exports = async (client, message) => {
  if(message.guild.id === client.server.guild) {
    if(client.user === message.author) return;
    let embed = new client.Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setAuthor("Poruka je izbrisana iz kanala "+message.channel.name)
    .setDescription(message.cleanContent)
    .setFooter("Autor poruke: "+message.author.username+" | "+client.config.ime)
    .setTimestamp();
    client.channels.get(client.server.msglogs).send(embed);
  }
}