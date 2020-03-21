const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

  if(message.channel.id !== "687395646222631069") return message.channel.send("Ovu komandu možeš koristiti samo u kanalu <#687395646222631069>");
  
  let user = message.author;
  let timeout = 604800000;
  let amount = 2500;
  
  let bronze = message.guild.roles.get("687709581505593470");
  let silver = message.guild.roles.get("687710015322456071");
  let gold = message.guild.roles.get("687710331136639048");
  let platinum = message.guild.roles.get("687710786352840857");
  
  if(message.member.roles.has(bronze.id)) amount = 2600;
  if(message.member.roles.has(silver.id)) amount = 2700;
  if(message.member.roles.has(gold.id)) amount = 2800;
  if(message.member.roles.has(platinum.id)) amount = 2900;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));

    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:negative_squared_cross_mark: Već si sakupio/la sedmičnu nagradu!\n\nMožeš je opet sakupiti za ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:white_check_mark: Sakupio/la si svoju sedmičnu nagradu od ${amount}$`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"weekly",
  aliases: ["week"]
}