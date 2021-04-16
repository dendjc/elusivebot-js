const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => { 
  let ownerID = ["490605344892911627", "649708455342505984"]
  var allowed = false;
  ownerID.forEach(id => {
    if(message.author.id == id) {
      allowed = true
    }
  });
  
  if(allowed != true) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  let user = message.mentions.members.first();
  let userr = message.mentions.users.first();
  if(userr.bot) return message.channel.send("Ne možeš oduzeti novac botu!");
  if(!user) return message.channel.send("Nisi označio/la člana kojem želiš oduzeti novac!");
    let ec = parseInt(args[1], 10);
    if (!ec) return message.channel.send("Nisi napisao/la količinu novca koje želiš oduzeti članu!");
    if(ec < 1) return message.channel.send("Ne možeš oduzeti manje od 1$");
    db.subtract(`money_${message.guild.id}_${user.id}`, ec)
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:negative_squared_cross_mark:  Oduzeto ${ec}$ članu ${user}\n\nNovo stanje: ${bal}$`);
    message.channel.send(moneyEmbed)

};
exports.help = {
    name: 'rm',
    description: 'oduzimanje novca članovima',
    usage: 'rm [@mention] [iznos]',
    category: 'economy-a',
    listed: true
};
