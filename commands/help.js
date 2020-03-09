exports.run = (client, message, args) => {
  var helpEmbed = new client.Discord.RichEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL) 
    .setDescription("**Napomena**: ukoliko je potreban unos dodatnih varijabli u komandu, one su označene sa `[]` i `()` u listi komandi.") 
    .addField("👑 Administratorske komande", // Sets the title of the field 
              "**"+client.config.prefix+"text [tekst]** - ispis teksta preko bota!\n"+
              "**"+client.config.prefix+"clear [broj poruka (1-100)]** - brisanje poruka!\n"+
              "**"+client.config.prefix+"kick [@mention] [razlog]** - kickanje članova!\n"+ 
              "**"+client.config.prefix+"ban [@mention] [razlog]** - banovanje članova!\n"+ 
              "**"+client.config.prefix+"unban [@mention]** - unbanovanje članova (u fazi kodiranja)!\n"+
              "**"+client.config.prefix+"anick [@mention] [nick]** - mjenjanje nicka članovima (u fazi kodiranja)!" ) 
    .addField("👨 Korisničke komande", // Sets the title of the field 
              "**"+client.config.prefix+"ping** - ispis trenutnog pinga!\n"+
              "**"+client.config.prefix+"info [@mention (neobavezno)]** - informacije o korisničkom računu!\n"+ 
              "**"+client.config.prefix+"botinfo** - informacije o botu!\n"+
              "**"+client.config.prefix+"nick [nick]** - promjena nicka na serveru (u fazi kodiranja)!\n"+
              "**"+client.config.prefix+"avatar [@mention (neobavezno)]** - prikaz avatara!" )
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(helpEmbed);
}