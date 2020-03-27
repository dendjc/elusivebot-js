exports.run = async (client, message, args) => {
  let i = args[0];
  if(!i) return message.channel.send("Nisi napisao/la broj!");
  if(isNaN(i) || i < 1 || i  > 20) return message.channel.send("Broj ne smije sadržiti znakove, ne smije biti manji od 1 i veći od 20!");
  let embed = new client.Discord.RichEmbed()
  .setDescription(i);
  let msg = await message.channel.send(embed);
  i--;
  setInterval(() => {
    if(i > 0) {
      embed = new client.Discord.RichEmbed()
      .setDescription(i)
      msg.edit(embed)
      i--;
    }
    else clearInterval()
  }, 1000)
}