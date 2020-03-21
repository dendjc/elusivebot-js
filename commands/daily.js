const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => { 

  if(message.channel.id !=="687395646222631069") return message.channel.send("Ovu komandu možeš koristiti samo u kanalu <#687395646222631069>");
  
  let user = message.author;

  let timeout = 86400000;
  let amount = 300;
  
  let bronze = message.guild.roles.get("687709581505593470");
  let silver = message.guild.roles.get("687710015322456071");
  let gold = message.guild.roles.get("687710331136639048");
  let platinum = message.guild.roles.get("687710786352840857");
  
  if(message.member.roles.has(bronze.id)) amount = 350;
  if(message.member.roles.has(silver.id)) amount = 400;
  if(message.member.roles.has(gold.id)) amount = 450;
  if(message.member.roles.has(platinum.id)) amount = 500;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:negative_squared_cross_mark: Već si sakupio/la dnevnu nagradu!\n\nMožeš je opet sakupiti za ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Sakupio/la si dnevnu nagradu od ${amount}$`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}