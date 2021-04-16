const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let allowed = false;
  let conf = exports.conf;
  if(message.member.permissions.has("ADMINISTRATOR")) allowed = true;
  conf.allowed.forEach(a => {
    if(!allowed && message.author.id === a) allowed = true;
  });
  
  if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let params = args.join(" ");
  if(!params) return message.channel.send("Nisi napisao/la parametre poruke. Format bi trebao biti ovakav:\nNaslov | Boja embeda u HEX ili u slovima na eng. | Sadržaj poruke");
  if(!params.includes("|")) return message.channel.send("Nisi pravilno napisao/la parametre embeda!");
  
  message.delete();
  
  let naslov = params.split("|")[0];
  let boja = params.split("|")[1];
  let sadrzaj = params.split("|")[2];
  
  let embed = new Discord.MessageEmbed()
  .setTitle(naslov)
  .setThumbnail(message.guild.iconURL())
  .setColor(boja)
  .setDescription(sadrzaj)
  .setFooter(message.author.tag, message.author.displayAvatarURL())
  .setTimestamp();
  
  message.channel.send(embed);
}
exports.conf = {
   allowed: ["649708455342505984"]
}
exports.help = {
   name: "embed",
   description: "slanje poruka kao bot u embedu",
   usage: "embed [naslov] | [boja] | [tekst]",
   category: "admin",
   listed: true
}