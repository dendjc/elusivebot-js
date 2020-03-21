exports.run = (client, message, args) => {
  var shopEmbed = new client.Discord.RichEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL) 
    .setDescription("**Napomena**: Za kupovinu koristite komandu **"+client.config.prefix+"buy [broj]**\nValuta je **dolar ($)**")
    .addField("🛒 Shop", // Sets the title of the field 
              "**1. Bronze VIP** - cijena: **15000$**\n"+
              "**2. Silver VIP** - cijena: **30000$**\n"+
              "**3. Gold VIP** - cijena: **45000$**\n"+
              "**4. Platinum VIP** - cijena: **60000$**" ) 
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(shopEmbed);
}