exports.run = async (client, message, args) => {
  let allowed = false;
  let conf = exports.conf;
  if(message.member.permissions.has('MANAGE_NICKNAMES', false, false)) allowed = true;
  conf.allowed.forEach(a => {
    if(!allowed && message.author.id === a) allowed = true;
  });
  
  if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let tagged = message.mentions.users.first();
  if(tagged === message.author) return message.channel.send("Za mjenjanje svog nicka koristi **"+client.config.prefix+"nick**!");
  let taggedmember = message.mentions.members.first();
  if (!tagged) return message.channel.send("Nisi pravilno označio/la člana!");
  let nick = args.slice(1).join(" ");
  if(!nick) return message.channel.send("Nisi napisao/la nick koji želiš dodijeliti tom članu!");
  let starinick = taggedmember.nickname;
  if(starinick === null) starinick = "//";
  let nickEmbed = new client.Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setAuthor(message.author.username+" je promjenio/la nick članu "+tagged.username+".", message.author.displayAvatarURL)
  .setDescription(`**Stari nick:** ${starinick}\n**Novi nick:** ${nick}`);
  message.guild.member(tagged).setNickname(nick).then(() => message.channel.send(nickEmbed)).catch(err => message.channel.send("Nisam mogao promjeniti nick tog člana zbog: "+err));
}
exports.conf = {
    allowed: ["649708455342505984"]
}
exports.help = {
    name: 'anick',
    description: 'mjenjanje nicka članovima',
    usage: 'anick [@mention] [nick]',
    category: 'moderation',
    listed: true
};