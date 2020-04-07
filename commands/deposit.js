const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {

  let user = message.author;

  let member = await db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = await db.fetch(`bank_${message.guild.id}_${user.id}`)

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(":negative_squared_cross_mark: Ne možeš prebaciti 0$ na banku!");
  
  if(args[0] == 0) return message.channel.send(embed5);
  
  else if (args[0] == 'all') {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    let embedbank = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setDescription(":negative_squared_cross_mark: Nemaš nikakav novac za depozit!")

    if(money === 0) return message.channel.send(embedbank)

    db.add(`bank_${message.guild.id}_${user.id}`, Number(money))
    db.subtract(`money_${message.guild.id}_${user.id}`, Number(money))
    let embedall = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Prebacio/la si sav novac na banku!`);
  message.channel.send(embedall)
  
  } else {
  
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:grey_question: Napiši iznos koji želiš prebaciti na banku!`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Ne možeš prebaciti negativan novac!`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Nemaš toliko novca!`);

  if (member < args[0]) {
      return message.channel.send(embed4)
  }
  let embed6 = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(":negative_squared_cross_mark: Ne možeš koristiti znakove!");

 if (args[0] != Number(args[0])) {
  return message.channel.send(embed6)
 }
    
  let embed7 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Prebacio/la si ${args[0]}$ na banku!`);

  message.channel.send(embed7)
  db.add(`bank_${message.guild.id}_${user.id}`, Number(args[0]))
  db.subtract(`money_${message.guild.id}_${user.id}`, Number(args[0]))
  }
}
module.exports.help = {
  name:"deposit",
  aliases: ["dep"]
}