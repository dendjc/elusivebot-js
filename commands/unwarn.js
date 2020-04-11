const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let user = message.mentions.users.first();
  if(!user) return message.channel.send("Nisi označio/la člana!");
  let member = message.guild.members.cache.get(user.id);
  
  let warns = args[1];
  if(!warns) return message.channel.send("Nisi napisao/la broj warnova koje želiš očistiti!");
  if((isNaN(warns) && warns != "all") || (!isNaN(warns) && warns != "all" && warns < 1 || warns > 20)) return message.channel.send("Nisi pravilno napisao/la broj warnova (1-20, all za sve)");
  
  let membername = member.nickname;
  if(membername === null) membername = user.username;
  
  if(!isNaN(warns) && (warns > 0 || warns < 21)) {
    let memberwarns = await db.fetch(`warns_${message.guild.id}_${user.id}`);
    if(memberwarns === null || memberwarns == 0) return message.channel.send("Taj član nema nijedan warn!");
    if(warns > memberwarns) return message.channel.send("Taj član nema toliko warnova (trenutno ih ima "+memberwarns+")");
    db.subtract(`warns_${message.guild.id}_${user.id}`, Number(warns))
      message.channel.send("Očistio/la si warnove članu "+membername+" (broj očišćenih warnova: "+warns+").");
      let warnlogs = await db.fetch(`logs_${message.guild.id}_warnlogs`);
      if(warnlogs === null) return;
      warnlogs = client.channels.cache.get(warnlogs);
      if(warnlogs === undefined) return;
      let embed = new client.Discord.MessageEmbed()
      .setAuthor(message.author.username+" je očistio/la warnove članu "+membername, message.author.displayAvatarURL())
      .setDescription("**Broj očišćenih warnova:** "+warns)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
      .setTimestamp();
      warnlogs.send(embed);
  }
  if(isNaN(warns) && warns == "all") {
    let memberwarns = await db.fetch(`warns_${message.guild.id}_${user.id}`);
    if(memberwarns === null || memberwarns == 0) return message.channel.send("Taj član nema warnove!");
    db.delete(`warns_${message.guild.id}_${user.id}`)
      message.channel.send("Očistio/la si sve warnove članu "+membername);
      let warnlogs = await db.fetch(`logs_${message.guild.id}_warnlogs`);
      if(warnlogs === null) return;
      warnlogs = client.channels.cache.get(warnlogs);
      if(warnlogs === undefined) return;
      let embed = new client.Discord.MessageEmbed()
      .setAuthor(message.author.username+" je očistio sve warnove članu "+membername, message.author.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
      .setTimestamp();
      warnlogs.send(embed);
  }
}