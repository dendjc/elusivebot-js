const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let ownerID = ["495897264108339200", "649708455342505984"]
  var allowed = false;
  ownerID.forEach(id => {
  if(message.author.id == id) {
    allowed = true
  }
  });

  if(allowed != true) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let user = message.mentions.members.first();
  let userr = message.mentions.users.first();
  if(!userr) return message.channel.send("Nisi označio/la člana kojem želiš dati novac!");
  if(userr.bot) return message.channel.send("Ne možeš botu dati novac!");
  
  if(!user) return message.channel.send("Nisi označio/la člana kojem želiš dati novac!");
    let ec = parseInt(args[1], 10);
    if (!ec) return message.channel.send("Nisi napisao/la količinu novca kojeg želiš dodati tom članu!");
    if(ec < 1 || ec > 100000) return message.channel.send("Ne možeš dati manje od 1$ ili više od 100000$");
    db.add(`money_${message.guild.id}_${user.id}`, ec)
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Dodano ${ec}$ članu ${user}\n\nNovo stanje: ${bal}$`);
    message.channel.send(moneyEmbed)

};

module.exports.help = {
  name:"add",
  aliases: ["am"]
}