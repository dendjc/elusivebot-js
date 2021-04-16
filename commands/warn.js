const db = require("quick.db");

exports.run = async (client, message, args) => {
  let allowed = false;
  let allowed2 = false;
  let conf = exports.conf;
  if(message.member.permissions.has("MANAGE_MESSAGES")) allowed = true;
  conf.allowed.forEach(a => {
  if(!allowed && message.author.id === a) {
    allowed = true;
    allowed2 = true;
  }
  });

  if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let user = message.mentions.users.first();
  if(!user) return message.channel.send("Nisi označio/la člana!");
  let member = message.guild.members.cache.get(user.id);
  if((member.permissions.has("ADMINISTRATOR") || member.permissions.has("KICK_MEMBERS") || member.permissions.has("MANAGE_MESSAGES")) && !allowed2) return message.channel.send("Ne možeš dati warn staffu!");
  
  let razlog = args.slice(1).join(" ");
  if(!razlog) return message.channel.send("Nisi napisao/la razlog!");
  
  let membername = member.nickname;
  if(membername === null) membername = user.username;
  
  db.add(`warns_${message.guild.id}_${user.id}`, 1)
    message.channel.send("Dao/la si warn članu "+membername+"!");
    let warnlogs = await db.fetch(`logs_${message.guild.id}_warnlogs`);
    if(warnlogs === null) return;
    warnlogs = client.channels.cache.get(warnlogs);
    if(warnlogs === undefined) return;
    let warns = await db.fetch(`warns_${message.guild.id}_${user.id}`);
    let embed = new client.Discord.MessageEmbed()
    .setAuthor(message.author.username+" je dao/la warn članu "+membername, message.author.displayAvatarURL())
    .addField("Broj warnova", warns)
    .addField("Razlog", razlog)
    .setThumbnail(user.displayAvatarURL())
    .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
    .setTimestamp();
    warnlogs.send(embed);
}
exports.conf = {
    allowed: ["649708455342505984"]
}
exports.help = {
    name: 'warn',
    description: 'warnanje članova',
    usage: 'warn [@mention] [razlog]',
    category: 'moderation',
    listed: true
};