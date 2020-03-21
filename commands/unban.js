exports.run = async (client, message, args, level) => {
  if(!message.member.hasPermission("BAN_MEMBERS", false, false)) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  try {
    const user = args[0]
    const settings = message.guild.id;

    if (user) {
      message.guild.unban(user).then(() => {
        message.reply("uspješno ste unbanovali tog korisnika!")

        const modLogChannel = settings.modLogChannel
        if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
          const embed = new client.Discord.RichEmbed()
            .setTitle("Unban člana!")
            .setColor(client.config.embed.color)
            .setDescription(`ID člana: ${user}\nModerator: ${message.author.username}`)

          message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed)
        }
      }).catch(err => {
        message.reply(`nisam mogao unbanovati člana zbog: ${err}`)
      })
    } else {
      message.reply('nisi napisao ID člana kojeg želiš unbanovati!')
    }
  } catch (err) {
    message.channel.send('Pojavila se greška: ' + err + '').catch()
  }
}
/*
exports.conf = {
  enabled: true,
  aliases: ['b'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'unban',
  category: 'Moderation',
  description: 'Unbans a member for an optional reason.',
  usage: 'unban <userid> [reason]'
} */
