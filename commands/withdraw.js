const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  
    if (message.channel.id !== "720037477146165399")
    return message.channel.send(
      "Ovu komandu možeš koristiti samo u kanalu <#720037477146165399>"
      )

  let user = message.author;

  let member = await db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = await db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, Number(money))
    db.add(`money_${message.guild.id}_${user.id}`, Number(money))
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Povukao/la si sav novac sa banke!`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:grey_question: Napiši iznos koji želiš povući!`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Ne možeš povući negativan novac!`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Nemaš toliko novca u banci!`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }
    
  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Ne možeš povući 0$!`);
  
  if (member2 === 0) {
      return message.channel.send(embed5)
  }
  let embed6 = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(":negative_squared_cross_mark: Ne možeš koristiti znakove!");

 if (isNaN(args[0])) {
  return message.channel.send(embed6)
 }

  let embed7 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Povukao/la si ${args[0]}$ iz banke!`);

  message.channel.send(embed7)
  db.subtract(`bank_${message.guild.id}_${user.id}`, Number(args[0]))
  db.add(`money_${message.guild.id}_${user.id}`, Number(args[0]))
  }
}
exports.help = {
    name: 'withdraw',
    description: 'povlačenje novca sa banke',
    usage: 'withdraw [iznos]',
    category: 'economy',
    listed: true
};