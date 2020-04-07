const Discord = require("discord.js");
const delay = require("delay");

exports.run = async (client, message, args) => {
  let broj = args[0];
  if(!broj) return message.channel.send("Nisi napisao/la broj!");
  if(isNaN(broj) || broj < 1 || broj  > 20) return message.channel.send("Broj ne smije sadržiti znakove, ne smije biti manji od 1 i veći od 20!");
  let embed = new Discord.MessageEmbed()
  .setDescription(broj);
  let msg = await message.channel.send(embed);
  broj--;
  for(let i = broj; i > 0; i--) {
    embed = new Discord.MessageEmbed()
    .setDescription(i);
    await delay(1000);
    msg.edit(embed);
  }
}