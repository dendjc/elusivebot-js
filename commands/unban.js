exports.run = async (client, message, args, level) => {
  let allowed = false;
  let conf = exports.conf;
  if(message.member.permissions.has("BAN_MEMBERS")) allowed = true;
  conf.allowed.forEach(a => {
  if(!allowed && message.author.id === a) allowed = true;
  });

  if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  try {
    const user = args[0]
    const settings = message.guild.id;

    if (user) {
      message.guild.members.unban(user).then(() => {
        message.channel.send("Unbanovao/la si tog korisnika!")

        const modLogChannel = settings.modLogChannel
        if (modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
          const embed = new client.Discord.MessageEmbed()
            .setTitle("Unban korisnika!")
            .setColor(client.config.embed.color)
            .setDescription(`ID korisnika: ${user}\nModerator: ${message.author.username}`)

          message.guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed)
        }
      }).catch(err => {
        message.reply(`nisam mogao unbanovati korisnika zbog: ${err}`)
      })
    } else {
      message.reply('nisi napisao ID korisnika kojeg želiš unbanovati!')
    }
  } catch (err) {
    message.channel.send('Pojavila se greška: ' + err + '').catch()
  }
}
exports.conf = {
    allowed: ["649708455342505984"]
}
exports.help = {
    name: 'unban',
    description: 'unbanovanje korisnika',
    usage: 'unban [ID korisnika]',
    category: 'admin',
    listed: true
};