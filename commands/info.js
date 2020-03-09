exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
    let userr = message.mentions.members.first() || message.member;
    let uInfoEmbed = new client.Discord.RichEmbed()
    .setThumbnail(user.displayAvatarURL)
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("__**Informacije o članu**__")
    .setColor(0x15f153) 
    .addField("Ime", `${user.username}#${user.discriminator}`) // Their name, I use a different way, this should work 
    .addField("ID", user.id) // Their ID 
    .addField("Datum ulaska", userr.joinedAt) // When they joined 
    .addField('Uloge', userr.roles.map(r => `${r}`).join(' | '), true)
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    await message.channel.send(uInfoEmbed); 
}
