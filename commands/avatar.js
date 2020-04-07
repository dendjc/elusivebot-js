exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let avatarEmbed = new client.Discord.MessageEmbed()
    .setAuthor(user.username+"#"+user.discriminator)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    await message.channel.send(avatarEmbed);
}