exports.run = async (client, message, args) => {
  let infoEmbed = new client.Discord.MessageEmbed()
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("__**Informacije o botu**__")
    .setColor(client.config.embed.color)
    .addField("**Ime**", client.config.ime)
    .addField("**Verzija**", client.config.verzija)
    .addField("**Developer**", client.config.dev.name)
    .addField("**Broj servera**", client.guilds.cache.size)
    .addField("Zadnji update", client.config.update)
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    await message.channel.send(infoEmbed);
}