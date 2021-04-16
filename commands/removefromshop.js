const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let items = await db.all().filter(data => data.ID.startsWith(`shop_${message.guild.id}_`));
  if(items === null) return message.channel.send("Shop je prazan!");
  
  let slot = args[0];
  if(!slot) return message.channel.send("Nisi napisao/la slot!");
  if(isNaN(slot) || slot < 1 || slot > 20) return message.channel.send("Slot ne može sadržavati znakove, biti veći od 20 ili manji od 1!");
  
  
  let role = await db.fetch(`shop_${message.guild.id}_${slot}`);
  
  if(role === null) return message.channel.send("U shopu se ne nalazi uloga sa tim IDom!");
  
  else {
    db.delete(`shop_${message.guild.id}_${slot}`);
    message.channel.send("Obrisao/la si ulogu na slotu " + slot + " iz shopa!");
  }
}
exports.help = {
  name: "removefromshop",
  description: "izbacivanje uloge iz shopa",
  usage: "removefromshop [slot]",
  category: "admin",
  listed: true
}