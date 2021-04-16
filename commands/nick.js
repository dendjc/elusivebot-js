exports.run = async (client, message, args) => {
  
  if (message.channel.id !== "720037477146165399")
    return message.channel.send(
      "Ovu komandu možeš koristiti samo u kanalu <#720037477146165399>"
      )

   if (client.cooldown.has(message.author.id))
    return message.reply("moraš sačekati 2h prije ponovnog mjenjanja nicka!");
  const nick = args.join(" "); 

  if (!nick) return message.reply("nisi upisao/la odgovarajući nick!");
  let starinick = message.member.nickname;
  if (starinick === null) starinick = "//";
  let nickEmbed = new client.Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setAuthor(
      message.author.username + " je promjenio/la svoj nick!",
      message.author.displayAvatarURL()
    )
    .setDescription(`**Stari nick:** ${starinick}\n**Novi nick:** ${nick}`);
  message.member
    .setNickname(nick)
    .then(() => message.channel.send(nickEmbed))
    .catch(err =>
      message.channel.send("Nisam mogao promjeniti tvoj nick zbog: " + err)
    );
  if (message.member.permissions.has("ADMINISTRATOR")) return;
  client.cooldown.add(message.author.id);
  setTimeout(() => {
    client.cooldown.delete(message.author.id);
  }, 7200000);
};
exports.help = {
  name: "nick",
  description: "mjenjanje nicka",
  usage: "nick [nick]",
  category: "main",
  listed: true
};
