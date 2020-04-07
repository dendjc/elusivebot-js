const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first();

  let money = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:grey_question: Označi nekoga da mu platiš!`);

  if (!user) {
      return message.channel.send(embed1)
  }
  
  if(user.bot) return message.channel.send("Ne možeš dati novac botu!");
  
  if(message.author === user) return message.channel.send("Ne možeš sebi platiti!");
  
  let member = message.guild.members.cache.get(user.id);
  
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:grey_question: Napiši iznos koji želiš platiti!`);

  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Ne možeš platiti negativan novac!`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:negative_squared_cross_mark: Nemaš toliko novca!`);

  if (money < args[1]) {
      return message.channel.send(embed4)
  }
  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(":negative_squared_cross_mark: Ne možeš platiti 0$!");
  
  if (args[1] == 0) {
      return message.channel.send(embed5)
  }
  let embed6 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(":negative_squared_cross_mark: Ne možeš koristiti znakove!");
  
  if (args[1] != Number(args[1])) {
      return message.channel.send(embed6);
  }
  let embed7 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Platio/la si ${user.username} ${args[1]}$`);

  message.channel.send(embed7)
  db.add(`money_${message.guild.id}_${user.id}`, Number(args[1]))
  db.subtract(`money_${message.guild.id}_${message.author.id}`, Number(args[1]))

}

module.exports.help = {
  name:"pay",
  aliases: [""]
}