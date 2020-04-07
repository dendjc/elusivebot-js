exports.run = (client, message, args) => {
  var shopEmbed = new client.Discord.MessageEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL()) 
    .setDescription("**Napomena**: Za kupovinu koristi komandu **"+client.config.prefix+"buy [broj]**\nValuta je **dolar ($)**")
    .addField("🛒 Shop", // Sets the title of the field 
              "**1. Bronze VIP** - cijena: **10000$**\n"+
              "**2. Silver VIP** - cijena: **25000$**\n"+
              "**3. Gold VIP** - cijena: **40000$**\n"+
              "**4. Platinum VIP** - cijena: **55000$**" ) 
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(shopEmbed);
}