const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let items = await db.all().filter(data => data.ID.startsWith(`shop_${message.guild.id}_`));
  if(items !== null && items.length === 20) return message.channel.send("Dostigao/la si maksimalan broj stvari u shopu!");
  if(items === null) items = { length: 0 };
  
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send("Nisi označio/la ulogu koju želiš postaviti u shopu!");
  if(role.permissions.has("ADMINISTRATOR")) return message.channel.send("Ne možeš postaviti ulogu koja ima permisiju administratora u shop!");
  
  let cijena = args[1];
  if(!cijena) return message.channel.send("Nisi napisao/la cijenu za tu ulogu!");
  if(isNaN(cijena) || cijena < 1 || cijena > 100000) return message.channels.send("Cijena ne može sadržiti znakove, biti veća od 100000$ ili manja od 1$");
  
  let slot = 0;
  
  for(let i = 1; i < 21; i++) {
    let shop = await db.fetch(`shop_${message.guild.id}_${i}`);
    if(shop === null) {
      slot = i;
      break;
    }
  }
  
  let roleinfo = {
    id: role.id,
    cijena: cijena,
    slot: slot
  }
  
  db.set(`shop_${message.guild.id}_${slot}`, roleinfo);
  message.channel.send("Dodao/la si ulogu " + role.toString() + " na slotu " + slot + " u shop po cijeni od " + cijena + "$");
}
exports.help = {
  name: "addtoshop",
  description: "dodavanje uloge u shop",
  usage: "addtoshop [@uloga] [cijena]",
  category: "admin",
  listed: true
}