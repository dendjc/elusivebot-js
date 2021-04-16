const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
    if (message.channel.id !== "720037477146165399")
    return message.channel.send(
      "Ovu komandu možeš koristiti samo u kanalu <#720037477146165399>"
      )
  
  let slot = args[0];
  if(!slot) return message.channel.send("Nisi napisao/la slot!");
  if(isNaN(slot) || slot < 1 || slot > 20) return message.channel.send("Nisi pravilno napisao/la slot.");
  let novac = await db.fetch(`money_${message.guild.id}_${message.author.id}`);
  if(novac === null) novac = 0;
  let items = await db.all().filter(data => data.ID.startsWith(`shop_${message.guild.id}_`)).sort((a, b) => JSON.parse(a.data).slot - JSON.parse(b.data).slot);
  if(items === null || items.length < 1) return message.channel.send("Shop je trenutno prazan!");
  let shop = await db.fetch(`shop_${message.guild.id}_${slot}`);
  if(shop === null) return message.channel.send("Nema uloge sa tim slotom u shopu!");
  if(shop.cijena > novac) return message.channel.send("Nemaš dovoljno novca za tu ulogu!");
  let role = message.guild.roles.cache.get(shop.id);
  if(!role) return message.channel.send("Ova uloga ne postoji na serveru!");
  if(message.member.roles.cache.has(role.id)) return message.channel.send("Već imaš ovu ulogu!");
  message.member.roles.add(role)
  .then(() => {
    db.subtract(`money_${message.guild.id}_${message.author.id}`, shop.cijena);
    message.channel.send("Kupio/la si ulogu **" + role.name + "** za __" + shop.cijena + "$__");
  }).catch(err => {
    console.log(err);
    message.channel.send("__Greška:__\nNisam ti mogao dati tu ulogu!");
  });
}
exports.help = {
  name: "buy",
  description: "kupovina uloge iz shopa",
  usage: "buy [slot]",
  category: "economy",
  listed: true
}